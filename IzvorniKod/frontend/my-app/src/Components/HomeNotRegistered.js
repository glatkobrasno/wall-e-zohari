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
    },[]);
    
    
    return(
        <div className="allk_display_box">
            <div className="kuharice_display_box">
                {cookBoksData && GenerateKuharice(cookBoksData)}
            </div>
        </div>
    );
}

async function getCookBoks(num){ // idcookbook, nemacookbook, typecookbook, entuziastname, entuziastIMG
        var respnse = await Axios.post(backURL+'/get_cookbooks/',{'num':num})
        return respnse.data;
        
}

function GenerateKuharice(cookBoksData){
    var data_kuharice_fil = cookBoksData.kuharice;
    var generated = [];
    for(var i=0; i < data_kuharice_fil.length; ++i){
       var data_kuharice=data_kuharice_fil[i];
    generated.push(cookBook(data_kuharice.idkuh, data_kuharice.naslov, data_kuharice.tema, data_kuharice.entuziast, data_kuharice.slika));
    }
    return generated;

    function cookBook(idCookBook, nameCookBook, typeCookBook, entuziastName, B64entuziastIMG){
        var imagesrc = "data:image/png;base64,"+B64entuziastIMG;
        var colour =  {'r':Math.random()*130+50, 'g':Math.random()*130+50, 'b':Math.random()*130+50};
        var colour_sty = "rgba("+Math.floor(colour['r'])+","+Math.floor(colour['g'])+","+Math.floor(colour['b'])+", 1)";
        var border_sty = "2px solid rgba("+Math.floor(colour['r']-50)+","+Math.floor(colour['g']-50)+","+Math.floor(colour['b']-50)+", 1)";
        return(
        <Link to={"/cookbook/kuharica/"+idCookBook} className="kuharice_cards" key={"link"+idCookBook}>
                <div className="entuziast_img_box" key={"entu"+idCookBook}>
                    <img className="entuziast_img" src={imagesrc} key={"img"+idCookBook} alt={"korisnik"+entuziastName}></img>
                </div>
                <div className="entuziast_name_box" key={"namebox"+idCookBook}>
                    by {entuziastName}
                </div>
                <div className="cookbooks_name_title_box" key={"books_t"+idCookBook}>
                    {nameCookBook}
                </div>
                <div className="type_text_box" key={"tags_ty"+idCookBook}>
                    tag:
                </div>
                <div className="tags_area_box" key={"tags"+idCookBook} style={{backgroundColor: colour_sty, border: border_sty }}>
                    {typeCookBook}
                </div>
        </Link>
        );
    }

    

}

export default HomeNotRegistered;