//node modules imports
import React from "react";
//css imports
import '../styles/HomeNotRegistered.css';
import { Link } from "react-router-dom";
import Axios from "axios";

const backURL='http://127.0.0.1:8000';

function HomeNotRegistered(){
    
    getCookBoks(6);
    
    return(
        <div className="kuharice_display_box">
            {/* {GenerateKuharice} */}
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
        <Link to={"/kuharica/kuharica/"+idCookBook}>
            <div className="kuharice_cards">
                <div className="entuziast_img_box">
                    <image className="entuziast_img"></image>
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
    }

}

export default HomeNotRegistered;