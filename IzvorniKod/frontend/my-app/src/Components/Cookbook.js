//node modules imports
import React from "react";
import Axios from 'axios';
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import '../Components/CommentFields'
//css imports
import '../styles/Cookbook.css';
import CommentFields from "../Components/CommentFields";

const backURL='http://127.0.0.1:8000';//backend URL

async function requestCookbookData(cookbookID){ // idkuharica
    try{
        //logic for getting cookbook data
        var response = await Axios.post(backURL+'/get_cookbookdata/', {'cookbookID':cookbookID});// response -> Tema, Naslov, DatumIzrade, KorisnickoIme, Slika
        return response.data;
    }
    catch(Error){
        console.log(Error);
    }
    
}



function Cookbook(){
    const [CookbookData, setCookbookData] = useState(null);
    const {type, id} = useParams();
    const [CookbookImage, setCookbookImage] = useState(null);

    useEffect(() =>{ // Gets new  data when type or id change
        const fetch = async () => {
            try {
            const data = await requestCookbookData(id);
            setCookbookData(data);
            setCookbookImage("data:image/png;base64,"+data.slika);
            } catch (error) {
            console.error('Error fetching cookbook data:', error);
            }
        }
        fetch();
    },[type, id]);

    return(
        <div className = "Individual_Cookbook_box">
            {CookbookData && (
                <>
                    <div className = "Individual_Cookbook_box_title">{CookbookData.naslov}</div>
                    <div className = "Individual_Cookbook_box_params">
                        Tema kuharice: {CookbookData.tema}<br></br>
                        Izradio korisnik: {CookbookData.korisnickoime_id}<br></br>
                        Datum izrade kuharice: {CookbookData.datumizrade}<br></br>
                        <div className = "Individual_Cookbook_box_image_container">
                            <img className='CookbookCreatorDisplay'
                            src={CookbookImage}
                            alt="Cookbook Display"
                            >
                            </img>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cookbook;