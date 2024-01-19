import React from "react";
import Axios from 'axios';
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/ChooseDiet.css';

import conf_back_url from "../configuration.js" 
const backURL=conf_back_url;//backend URL


function ChooseDiet(){
    

    return(
        <div className="DietList">
            {GenerateDiets()}
        </div>

    );
}

function DietBox(title,desc,i){
    return(
        <div className="DietBox" key={i}>
            <div className="textbox">
                <div className="title"> {title} </div>
                <div>{desc} </div>
            </div>
            <button className="dietbutton" onClick={async () => {
                let userData = JSON.parse(sessionStorage.getItem('userData'));
                var data= {
                    'UserName': userData.username,
                    'SelectedDiet': title,
                }
                var response= await Axios.post(backURL+'/alter_diet/',data);
                console.log(response);
                alert("dijeta uspješno odabrana");
                
            }}> Odaberi dijetu</button>
        </div>
    );
}


function GenerateDiets(){
    const [DietData,SetDietData]=useState("");
    var generated=[];
    useEffect(() => {
        const Do = async () => {
            // get the data from the api
            const response= await Axios.get(backURL+'/get_all_diets/');
            // convert the data to json
            
        
            // set state with the result
            SetDietData(response.data.diets);
          }
        Do();
      }, [])
    console.log(DietData);
    for (var i=0; i<DietData.length; i++){
        generated.push(DietBox(DietData[i][0],DietData[i][1],i));
        
    }
    return(generated);

}


export default ChooseDiet;