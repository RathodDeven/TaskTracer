import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation} from 'react-router-dom'


const Header = ({title,onAdd,showTask}) => {
    const location = useLocation();
    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === "/" && 
            <Button text={showTask ? "Close" : "Add"} color={showTask ? "red" : "blue"} onClick={onAdd}/>
        }

        </header>
    )
}

Header.defaultProps = {
    title: "Defaul Title",
}


//css in js
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }



Header.propTypes ={
    title: PropTypes.string.isRequired,
}






export default Header
