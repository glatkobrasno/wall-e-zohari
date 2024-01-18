//node modules imports
import React from "react";
import Axios from 'axios';
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import '../Components/CommentFields'
import { Link } from 'react-router-dom';
//css imports
import '../styles/Recipe.css';

const backURL='http://127.0.0.1:8000';//backend URL

function StepBox(IDslika, Slika, Opissl, Opiskorak){
    var imagesrc = "data:image/png;base64,"+Slika
    
    return(
        <div className="step_box" key={"step"+IDslika}>
            <div className="step_box_explain" key={"sbexplain"+IDslika}>{Opiskorak}</div>
            <div className="step_box_display" key={"sbdisplay"+IDslika}>
                <img className='step_box_displayed' key={"sbdisplayed"+IDslika}
                            src={imagesrc}
                            alt={Opissl}
                    >
                </img>
            </div>
            <div className="step_box_displaytext" key={"sbdisplaytext"+IDslika}>{Opissl}</div>
        </div>
    );
}

function ProductLine(IDrecept,ImeProizvod,Kolicina){
    return(
        <div className="ProductLine_box" key={"prname"+ImeProizvod}>
            {ImeProizvod}<br key={"br1"+ImeProizvod}></br>
            Količina sastojaka: {Kolicina}<br key={"br2"+ImeProizvod}></br>
        </div>
    );
}

async function requestRecipeData(recipeID){ // idkuharica
    try{
        //logic for getting recipe data
        var response = await Axios.post(backURL+'/get_recipedata/', {'recipeID':recipeID});// response -> idrecept,imerecept,velicinaporcija,vrijemepripreme,datumizrade,korisnickoime,slikaautor
        return response.data;
    }
    catch(Error){
        console.log(Error);
    }
    
}

async function requestKoraciData(recipeID){
    try{
        //logic for getting recipe steps data
        var response = await Axios.post(backURL+'/get_steps_from_recipe/', {'recipeID':recipeID});// response -> list of dicts with IDrecept, Slika, Opissl, Opiskorak
        return response.data;
    }
    catch(Error){
        console.log(Error);
    }
}

async function requestProizvodiData(recipeID){
    try{
        //logic for getting necessary products data
        var response = await Axios.post(backURL+'/get_products_from_recipe/', {'recipeID':recipeID});// response -> list of dicts with IDrecept, ImeProizvod, Kolicina
        return response.data;
    }
    catch(Error){
        console.log(Error);
    }
}

function GenerateProductsList(id,ProductsData){
    var generated=[];
    if(ProductsData !== null){
        var productslist= ProductsData.Returned_Data; // list of dicts with IDrecept, ImeProizvod, Kolicina
        for(var i = 0; i < productslist.length; ++i){
            generated.push(ProductLine(productslist[i].IDrecept,productslist[i].ImeProizvod,
                productslist[i].Kolicina));
        }
        return(generated);
        
    }
    else{
        return(null);
    }
}

function GenerateSteps(id,KoraciData){
    var generated=[];
    if(KoraciData !== null){
        var koracilist= KoraciData.Returned_Data; // list of dicts with IDrecept, IDslika, Slika, Opissl, Opiskorak
        for(var i = 0; i < koracilist.length; ++i){
            generated.push(StepBox(koracilist[i].IDslika,koracilist[i].Slika,
                koracilist[i].Opissl,koracilist[i].Opiskorak));
        }
        return(generated);
        
    }
    else{
        return(null);
    }
}

function Recipe(){
    const [RecipeData, setRecipeData] = useState(null); // idrecept,imerecept,velicinaporcija,vrijemepripreme,datumizrade,korisnickoime,slikaautor
    const [KoraciData, setKoraciData] = useState(null); // list of dicts with IDrecept, Slika, Opissl, Opiskorak
    const [ProizvodiData, setProizvodiData] = useState(null); // list of dicts with IDrecept, ImeProizvod, Kolicina
    const {type, id} = useParams();

    useEffect(() =>{ // Gets new  data when type or id change
        const fetch = async () => {
            try {
            const data = await requestRecipeData(id);
            const data2 = await requestKoraciData(id);
            const data3 = await requestProizvodiData(id);
            setRecipeData(data);
            setKoraciData(data2);
            setProizvodiData(data3);
            } catch (error) {
            console.error('Error fetching recipe data:', error);
            }
        }
        fetch();
    },[type,id]);

    return(
        <div className = "Individual_Recipe_box">
            {RecipeData && (
                <>
                    <div className = "RecipeHeader">
                        <div className = "Individual_Recipe_box_title">{RecipeData.imerecept}</div>

                        <div className = "Individual_Recipe_box_params">
                            Broj porcija: {RecipeData.velicinaporcija}<br></br>
                            Vrijeme pripreme: {RecipeData.vrijemepripreme}<br></br>
                            Datum izrade recepta: {RecipeData.datumizrade}<br></br>
                            Izradio/la: {RecipeData.korisnickoime}<br></br>
                            <div className = "Individual_Recipe_box_image_container">
                                <img className='RecipeCreatorDisplay'
                                src={"data:image/png;base64,"+RecipeData.slikaautor}
                                alt="Recipe Display"
                                >
                                </img>
                            </div>

                        </div>
                    </div>
                    <div className = "RecipeLower">
                        <div className = "Individual_Recipe_box_productlist">
                            {ProizvodiData && (
                                <>
                                    <div className = "productlist_params">
                                        <br></br>
                                        <div className = "productlist_title">
                                        Sastojci:
                                        </div>
                                        <br></br>
                                        <br></br>
                                        {GenerateProductsList(id,ProizvodiData)}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className = "Recipe_Steps_box">
                            {KoraciData && (
                                <>
                                    <div className = "Recipe_Steps_lowerbox">
                                        {GenerateSteps(id,KoraciData)}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Recipe;