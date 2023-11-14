//modules imports
import React from "react";
import { Link } from 'react-router-dom';
//css imports
import '../styles/Menue.css'

function Menue(){
    return(
        
            <div className="menue">
                <ul className="select">
                    <Link to="/Login"><li>LogIn</li></Link>
                    <Link to="/SignUp"><li>SignUp</li></Link>
                    <Link to="/"><li>Home</li></Link>
                    <li>nesto</li>
                </ul>
            </div>
    );
}

export default Menue;