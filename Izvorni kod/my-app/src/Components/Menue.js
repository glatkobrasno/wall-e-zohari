//modules imports
import React from "react";
import { Link } from 'react-router-dom';
//css imports
import '../styles/Menue.css'

function Menue(){

    let userData = JSON.parse(sessionStorage.getItem("userData"));
    console.log( userData );
    
    if ( userData === null || userData.lvl === 1 ) {
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
    else if ( userData.lvl === 2 ) {
	return(
            
            <div className="menue">
                <ul className="select">
                    <Link to="/Login"><li>LogIn</li></Link>
                    <Link to="/SignUp"><li>SignUp</li></Link>
                    <Link to="/"><li>Home</li></Link>
		    <Link to="/AddProduct"><li>Products</li></Link>
                    <li>nesto</li>
                </ul>
            </div>
	);
    }
}

export default Menue;
