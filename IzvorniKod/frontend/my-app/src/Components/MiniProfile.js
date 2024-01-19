//modules imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
//css imports
import "../styles/MiniProfile.css";
//component imports

//media import
import defaultImageSrc from "../images/defaultProfile.png"

function MiniProfile(){

    const navigate = useNavigate();
    const [miniuname, setMiniUname] = useState('temp');
    const [miniprofImg, setMiniProfImg] = useState(defaultImageSrc);

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        if(userData){
            //console.log(userData)
            //console.log(userData)
            setMiniUname(userData.username)
            if(userData.lvl === 2 || userData.lvl === 3){
                setMiniProfImg("data:image/png;base64,"+userData.slika);
            }
        }
    },[]);

    function odjavi(){
        sessionStorage.removeItem('userData');
        navigate("/");
        window.location.reload();
    }  

    return(
        <div className='miniProfileBox'>
            <div className='odjavaBtn' onClick={odjavi}>ODJAVA</div>
            <div className='userName_mini'><span className='scroll-text'>{miniuname}</span><span className='scroll-text'>{miniuname}</span></div>
            <div className='profileImgBox'>
                <img className='profileImg'
                    src={miniprofImg}
                    alt="Profile"
                >
                </img>
            </div>
            
            
        </div>
    );

}



export default MiniProfile;