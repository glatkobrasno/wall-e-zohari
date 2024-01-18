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
                </ul>
            </div>
	);
    }
    else if ( userData.lvl === 2 ) {
	return(
            
            <div className="menue">
                <ul className="select">
                    <Link to="/"><li>Home</li></Link>
		            <Link to="/AddProduct"><li>Dodaj prozvod</li></Link>
                    <Link to="/AddDiet"><li>izradi dijetu</li></Link>
                </ul>
            </div>
	);
    }
    else if ( userData.lvl === 3 ) {
        return(
                
                <div className="menue">
                    <ul className="select">
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/AddCookBook"><li>Dodaj Kuharicu</li></Link>
                        <li>nesto</li>
                    </ul>
                </div>
        );
    }

    else if ( userData.lvl === 4 ) {
        return(
                
                <div className="menue">
                    <ul className="select">
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/Administrative"><li>Administracija</li></Link>
                    </ul>
                </div>
        );
    }
}

export default Menue;
