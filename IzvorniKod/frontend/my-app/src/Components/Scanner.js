import React, {useState } from "react";
//css imports
import '../styles/Scanner.css';
import Axios from "axios";
import { Link } from "react-router-dom";

import conf_back_url from "../configuration.js" 
const backURL=conf_back_url;//backend URL

function Scanner(){
    //const [file, setFile]=useState(''); // for using file
    const [binImg, setBinImg] = useState(null); // stores binary img data
    const [imgUrl, setImgUrl] = useState(''); // for image prepreview
    const [recipesData, setRecipesData] = useState(null);

    return(
        <div className="scanner_all_box">
            <span className="title_qr">Unesite QR kod</span>
            <div className="scanner_form_box">
                <form className="scanner_form" onSubmit={handleQRsubmit}>
                    <div className="preview_box_qr">
                        <input type='file' name='profImg' id='upload_qr' onChange={handleImage} accept='.jpg, .jpeg, .png' size="500000" required></input>
                        <img src ={imgUrl}  className='imgprev_qr' alt='uploaded.img'></img>
                    </div>
                    <input type="submit" className="qrrec_sub_btn"></input>
                </form>
            </div>
            <div className="generated_recepise_with_box">
                {recipesData && generateRecipesWith()}
            </div>
        </div>
    );


    function handleImage(e){
        const selectedFile = e.target.files[0];
        //setFile(selectedFile);
        const reader = new FileReader();

        if(selectedFile){
            var fSize=selectedFile.size
            if(fSize > 5000000){
                alert('Prevelika Slika, max 5 MB');
                URL.revokeObjectURL(imgUrl);
                setImgUrl('');
                e.target.value = null;
            }
            else{
                reader.onloadend = () => {
                    const binaryData = reader.result;
                    const base64String = arrayBufferToBase64(binaryData); // Convert ArrayBuffer to Base64
                    setBinImg(base64String);
                }
            setImgUrl(URL.createObjectURL(selectedFile));
            reader.readAsArrayBuffer(selectedFile);
            }
        }
        else{
            URL.revokeObjectURL(imgUrl);
            setImgUrl('');
        }
        
        function arrayBufferToBase64(arrayBuffer) {
            let binary = '';
            const bytes = new Uint8Array(arrayBuffer);
            for (let i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary);
        }
    }

    async function handleQRsubmit(e){
        e.preventDefault();
        try{
            var respnse = await Axios.post(backURL+'/get_recipe_with/', {'slika':binImg});
            setRecipesData(respnse.data.recepti);
        }
        catch(error){
            console.log(error);
            alert("Zadani QR nije nađen!");
        }
    }

    function generateRecipesWith(){
        var generated =[];
        for(var i=0;i<recipesData.length;++i){
            generated.push(genElement(recipesData[i]));
        }

        return (generated);


        function genElement(rec){
            var img = "data:image/png;base64,"+rec.slika
            var time = rec.vrijemePripreme.split(":")
            time[0] = +time[0]
            time[1] = +time[1]
            time[2] = +time[2]
            var tx_time = ''
            if(time[0]!==0){
                tx_time = tx_time + time[0]+"dana "
            }
            if(time[1]!==0){
                tx_time = tx_time + time[1]+"h "
            }
            if(time[2]!==0){
                tx_time = tx_time + time[2]+"min "
            }
            console.log(rec.idrecept)
            return(
            <Link to={"/recipe/recept/"+rec.idrecept} className="recipes_link_box" 
                key={"rc_link"+rec.idrecept}
                style={{
                    backgroundImage: `url(${img}), linear-gradient(to right bottom, #20385c, #23416b, #254b7b, #27558b, #275f9b)`,
                    backgroundSize: `100%`,
                    backgroundPosition:`center`,
                    backgroundBlendMode: 'multiply',
                    }}>
                <div className="rec_title_box" key={"rc_title"+rec.idrecept}>
                    {rec.imerecept}
                </div>
                <div className="rec_by_box" key={"rc_by"+rec.idrecept}>
                    {"autor "+rec.entuziast}
                </div>
                <div className="rec_time_box" key={"rc_time"+rec.idrecept}>
                    {"trajanje: "+tx_time}
                </div>
            </Link>
            );
        }


    }
}

export default Scanner;