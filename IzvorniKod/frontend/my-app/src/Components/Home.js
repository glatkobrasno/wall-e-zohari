//node modules imports
import React from "react";
//css imports
import '../styles/Home.css';

import './HomeNotRegistered';
import HomeNotRegistered from "./HomeNotRegistered";

function Home(){
    return(
        <div className = "home">
            <HomeNotRegistered/>
        </div>
    );
}

export default Home;