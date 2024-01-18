//node modules imports
import React from "react";
import Axios from 'axios';
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import '../Components/CommentFields'
import { Link } from 'react-router-dom';
//css imports
import '../styles/Cookbook.css';

const backURL='http://127.0.0.1:8000';//backend URL

function RecipeBox(IDrecept,Imerecept,Velicinaporcija,Vrijemepripreme,Datumizrade,Slika){
    var imagesrc = "data:image/png;base64,"+Slika
    
    return(
        <Link to={"/Recipe/recept/"+IDrecept} className="recipe_link_box" key={"recipe"+IDrecept}>
            <div className="recipe_box_name" key={"rbname"+IDrecept}>{Imerecept}</div>
            <div className="recipe_box_portionsize" key={"rbportionsize"+IDrecept}>{"Broj porcija: " + Velicinaporcija}</div>
            <div className="recipe_box_preptime" key={"rbpreptime"+IDrecept}>{"Vrijeme pripreme: " + Vrijemepripreme}</div>
            <div className="recipe_box_date" key={"rbdate"+IDrecept}>{"Datum Izrade: " + Datumizrade}</div>
            <div className="recipe_box_display" key={"rbdisplay"+IDrecept}>
                <img className='recipe_box_displayed' key={"rbdisplayed"+IDrecept}
                            src={imagesrc}
                            alt="Recipe Display"
                    >
                </img>
            </div>
        </Link>
    );
}

function GenerateAddCookbookButton(id){
    return(
        <Link to={"/AddRecipe/"+id} className="addrecipe_box" key={"addrecipe"+id}>
            <div className="addrecipe_textbox" key={"addrecipetext"+id}>
                +
            </div>
        </Link>
    )
}

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

async function requestRecipesData(cookbookID){
    try{
        //logic for getting cookbook data
        var response = await Axios.post(backURL+'/get_recipes_from_cookbook/', {'cookbookID':cookbookID});// response -> list of dicts with 'IDrecept','Imerecept','Velicinaporcija','Vrijemepripreme','Datumizrade','Slika'
        return response.data;
    }
    catch(Error){
        console.log(Error);
    }
}

function GenerateRecipes(id, type,RecipesData){ // TODO ne radi
    var generated=[];
    if(RecipesData !== null){
        var recipeslist= RecipesData.Returned_Data; //list of dicts with 'IDrecept','Imerecept','Velicinaporcija','Vrijemepripreme','Datumizrade','Slika'
        for(var i = 0; i < recipeslist.length; ++i){
            generated.push(RecipeBox(recipeslist[i].IDrecept,recipeslist[i].Imerecept,
                recipeslist[i].Velicinaporcija,recipeslist[i].Vrijemepripreme,
                recipeslist[i].Datumizrade,recipeslist[i].Slika));
        }
        return(generated);
        
    }
    else{
        return(null);
    }
}

function Cookbook(){
    const [CookbookData, setCookbookData] = useState(null);
    const [RecipesData, setRecipesData] = useState(null); //list of dicts with 'IDrecept','Imerecept','Velicinaporcija','Vrijemepripreme','Datumizrade','Slika'
    const {type, id} = useParams();
    const [CookbookImage, setCookbookImage] = useState(null);

    let userData = JSON.parse(sessionStorage.getItem("userData"))

    useEffect(() =>{ // Gets new  data when type or id change
        const fetch = async () => {
            try {
            const data = await requestCookbookData(id);
            const data2 = await requestRecipesData(id);
            setCookbookData(data);
            setRecipesData(data2);
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

                    
                    <div className = "Individual_Cookbook_box_recipelist">
                        {RecipesData && GenerateRecipes(id,type,RecipesData)}
                    </div>
                    <div className= "Add_Cookbook_Button_Area">
                        { userData.lvl === 3 && userData.username === CookbookData.korisnickoime_id &&(
                            GenerateAddCookbookButton(id)
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Cookbook;