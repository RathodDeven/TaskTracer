import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";

import {useState,useEffect} from "react";
import {BrowserRouter as Router,Route} from "react-router-dom";


function App() {
  const[showTask,setShowTask] = useState(false);
  const [tasks,setTasks] = useState([])


  useEffect(()=>{
   const getTasks = async () =>{
     const tasksFromServer = await fetchTasks();
     setTasks(tasksFromServer);
   }

    getTasks();
  },[])

//fetch Tasks from server
const fetchTasks = async () =>{
  const res = await fetch("http://localhost:5000/tasks");
  const data = await res.json();
  return data;
}

//fetch a single task
const fetchTask = async(id) =>{
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json();

  return data;
}


//delete task
  const deleteTask = async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    })
    setTasks(tasks.filter((task)=> task.id !== id))
  }

  //toggle remainder
  const toggleRemainder = async(id) =>{
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle,reminder:!taskToToggle.reminder};
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body:JSON.stringify(updTask),
    })

    const data = await res.json();

    setTasks(
      tasks.map((task) => 
    task.id===id ? { ...task, reminder: data.reminder} : 
      task
      )
    )
  }

  //add task
  const addTask = async(task) =>{
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body:JSON.stringify(task),
    })

    const data =await res.json();

    setTasks([...tasks,data]);

    //-> if on local computer <-
    // const new_id=tasks[tasks.length-1].id + 1;
    // const newTask = {new_id,...task}
    // setTasks([...tasks,newTask]);
   
  }

  return (

    <Router>
    <div className="container">
     <Header title="Task Tracker" onAdd={()=>{setShowTask(!showTask)}} showTask={showTask} />
     
     <Route path="/" exact render={(props) =>(
       <>
       {showTask && <AddTask onADD={addTask}/>}
     {tasks.length >0 ? 
     (<Tasks tasks={tasks} onDelete={deleteTask}  onToggle={toggleRemainder}/> )
     :
     (<h3>No Tasks to show</h3>)
     }

       </>
     )} />
     <Route path="/about" component={About} />

     <Footer />

     
     
    </div>
    </Router>
  );
}


export default App;
