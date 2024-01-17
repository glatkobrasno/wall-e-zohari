//node modules imports
import React, { useEffect, useState } from "react";
//css imports
import '../styles/HomeNotRegistered.css';
import { Link } from "react-router-dom";
import Axios from "axios";

const backURL='http://127.0.0.1:8000';

function HomeNotRegistered(){
    const [cookBoksData, setCookBoksData] = useState(null)

    useEffect(()=>async function() {
       var data = await getCookBoks(6);
        setCookBoksData(data);
    },[cookBoksData]);
    
    
    return(
        <div className="kuharice_display_box">
            {cookBoksData && GenerateKuharice(cookBoksData)}
        </div>
    );
}

async function getCookBoks(num){ // idcookbook, nemacookbook, typecookbook, entuziastname, entuziastIMG
        var respnse = await Axios.post(backURL+'/get_cookbooks/',{'num':num})
        console.log(respnse.data.kuharice[0]);
        return respnse.data
        
}
function GenerateKuharice(cookBoksData){
    function cookBook(idCookBook, nameCookBook, typeCookBook, entuziastName, B64entuziastIMG){
        var imagesrc = "data:image/png;base64,"+B64entuziastIMG
        return(
        <Link to={"/kuharica/kuharica/"+idCookBook}>
            <div className="kuharice_cards">
                <div className="entuziast_img_box">
                    <image className="entuziast_img" src={imagesrc}></image>
                </div>
                <div className="entuziast_name_box">
                    {entuziastName}
                </div>
                <div className="cookbooks_name_title_box">
                    {nameCookBook}
                </div>
                <div className="tags_area_box">
                    {typeCookBook}
                </div>
            </div>
        </Link>
        );
    }
    var data_kuharice = cookBoksData.kuharice
    var generated = []
    for(var i=0; i < data_kuharice.lenght; ++i){
    generated.push(cookBook(data_kuharice.idkuh, data_kuharice.naslov, data_kuharice.tema, data_kuharice.entuziast, data_kuharice.slika))
    }

    return <div></div>;

}

export default HomeNotRegistered;