//modules imports
import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import {useParams} from 'react-router-dom';
//css imports
import '../styles/Profile.css';
//component imports
import defaultImageSrc from "../images/defaultProfile.png"
import { getByTestId } from '@testing-library/react';
import { Link } from 'react-router-dom';
//global val
const backURL='http://127.0.0.1:8000'//backend URL

async function getProfileData(data){
    try{
	var response = await Axios.post(backURL+'/get_profile_data/', data);
	return response;
    }
    catch(error){
	console.error('Error geting data: ', error);
    }
}

const Profile = () => {

    const { username } = useParams();
    const [profimg, setProfImg] = useState(defaultImageSrc);
    const [display,setDisplay] = useState(0);
    const [profData,setProfData] = useState(null);
    const [isfollowing, setIsFollowing] = useState(true);

    useEffect(() => {
	fetchData();
    }, [username]);

    
    const fetchData = async () => {
	var data={
            'UserName' : username,
	}
	let response = await getProfileData(data);
	let lvl = response.data.lvl;
	let slika = response.data.slika;
	setProfData(response.data);
	let userData = JSON.parse(sessionStorage.getItem("userData"));
	if (userData) {
	    data={
		'UserName1' : userData.username,
		'UserName2' : username,
	    }
	    var isf = await Axios.post(backURL+'/is_following/', data);
            console.log(isf.data.follows)
            setIsFollowing(isf.data.follows);
	    console.log(isfollowing);
	}
    
	if(lvl === 2 || lvl === 3){
            setProfImg("data:image/png;base64," + slika);
	}
	
    };
    async function Button() {
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        console.log(userData);
        if (!isfollowing){
            var data={
                'UserName1' : userData.username,
                'UserName2' : username,
            }
            let response= await Axios.post(backURL+'/follow/',data);
            setIsFollowing(!isfollowing);
            console.log(response);
            

        }
        else
        if (isfollowing){
            var data={
                'UserName1' : userData.username,
                'UserName2' : username,
            }
            var response= await Axios.post(backURL+'/unfollow/',data);
            setIsFollowing(!isfollowing);
        }
    }
    async function ButtonCB() {
        setDisplay(0);
    }
    async function ButtonR() {
        setDisplay(1);
	console.log(profData);
    }

    function generateCookbooks() {
	var gen = [];
	for (let i = 0; i < profData.kuharica.length; i += 1) {
	    gen.push(
		<Link to={"/cookbook/kuharica/"+profData.kuharica[i][0]} className="cookbook_link_box" key={'key'+i}>
		    <div className="cookbookEntry">
			{profData.kuharica[i][1]}
		    </div>    
		</Link>
	    );
	}
	return gen
    }

    function generateRecipes() {
	var gen = [];
	for (let i = 0; i < profData.recept.length; i += 1) {
	    gen.push(
		<Link to={"/recept/recept"+profData.recept[i][0]} className="recipe_link_box" key={'key'+i}>
		    <div className="recipeEntry">
			{profData.recept[i][1]}
		    </div>    
		</Link>
	    );
	}
	return gen
    }
    
    return(
        <div className = "profile">
	    {profData && (
                <>
		    <div className='profilebox'>
			<div className='ImageBox'>
			    <img className='ProfileImg' src={profimg} alt="Profile"/>
			</div>
			<div className='Uname_bio_box'>
			    <div className ='UnameField'>
				{profData.name + " " + profData.surname}
			    </div>
			    
			    <div className='biobox'> {profData.bio}</div>
			    <button className='FollowButton' id={isfollowing? 'UF':'F'} onClick={Button} >{isfollowing? 'Odpratite korisnika':'Zapratite korisnika'}</button>
			</div>
		    </div>
		    <div className='cbt'>
			<button className='CookBookB' onClick={ButtonCB} id = {display? 'UP':'P'} >{'Kuharice'}</button>
			<button className='RecepieB' onClick={ButtonR} id = {display? 'P':'UP'} >{'Recepti'}</button>
		    </div>
		    <div className='cookbookView' hidden = {display?true:false}>
			{generateCookbooks()}
		    </div>
		    <div className='recipeView' hidden = {display?false:true}>
			{generateRecipes()}
		    </div>
	        </>
            )}
        </div>

    );
    
}




export default Profile;
