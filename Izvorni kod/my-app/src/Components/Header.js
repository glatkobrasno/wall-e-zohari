//modules imports
import React from 'react';
//css imports
import '../styles/Header.css';
//component imports
import Menue from './Menue';

function Header(){
    return(
        <div className = "header">
            <div className = "menue_button"></div>
            
            <Menue/>
        </div>
        

    );
}

export default Header;