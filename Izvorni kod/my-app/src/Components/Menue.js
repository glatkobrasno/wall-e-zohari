import React from "react";
import { Link } from 'react-router-dom';
import '../styles/Menue.css'

function Menue(){
    return(
        <div className="menue">
            <ul className="select">
                <Link to="/Login" ><li>LogIn</li></Link>
                <li>nesto</li>
                <li>nesto</li>
            </ul>
        </div>
    );
}

export default Menue;