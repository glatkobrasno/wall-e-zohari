//modules imports
import React, { useState } from 'react';
//css imports
import '../styles/Header.css';
//component imports
import Menue from './Menue';
import MiniProfile from './MiniProfile';
import BackgroindImg1 from '../images/menueIcon_cloase.png'

function Header(){
    //variables
    var [menueOpen, setMenueOpen] = useState(false);
    var displayProfile = sessionStorage.getItem("userData");
    var iconStyle = { transition: '0.1s'}
    function menueIconClick(){
        setMenueOpen(!menueOpen);
    }
    
    checkMopen();
    // render resault
    return(
        <div className = "header">
            {displayProfile && <MiniProfile/>} {/*Adds profile if someone is loged in*/}
            <div className = "menue_button" 
            style={iconStyle}
            onClick={menueIconClick}
            >
            </div>
            
            {menueOpen && <Menue/>} {/*Adds menue if Icon is clicked*/}
        </div>
    );

    function checkMopen(){
        if(menueOpen){// changes the stile depending on menue state
           iconStyle = {...iconStyle, backgroundColor : 'rgb(60, 86, 119)', backgroundImage : `url(${BackgroindImg1})`,}; 
        }
        else{ iconStyle = {...iconStyle,};
        }
    }
}




export default Header;