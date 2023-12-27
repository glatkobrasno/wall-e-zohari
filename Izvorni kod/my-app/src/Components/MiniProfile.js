//modules imports
import React from 'react';
//css imports
import "../styles/MiniProfile.css";
//component imports

//media import
import defaultImageSrc from "../images/defaultProfile.png"

function MiniProfile(){

    
    return(
        <div className='miniProfileBox'>
            <div className='odjavaBtn' onClick={odjavi()}>ODJAVA</div>
            <div className='userName_mini'>temp name</div>
            <div className='profileImgBox'>
                <img className='profileImg'
                    src={"" || defaultImageSrc}
                    alt="Profile"
                >
                </img>
            </div>
            
            
        </div>
    );

    function odjavi(){

    }
}


export default MiniProfile;