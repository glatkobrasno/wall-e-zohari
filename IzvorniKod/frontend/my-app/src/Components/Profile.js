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
    const [profimg, setProfImg]= useState(defaultImageSrc);
    const [bio,setBio]= useState("");
    const [isfollowing,setIsFollowing]=useState(true);

    useEffect(() => {
	fetchData();
    }, []);

    
    const fetchData = async () => {
	var data={
            'UserName' : username,
	}
	const response = await getProfileData(data);
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
    
    if(response.data.lvl === 2 || response.data.lvl === 3){
        setProfImg("data:image/png;base64,"+response.data.slika);
        setBio(response.data.bio);

    
    }
	console.log(response);
    };
    async function Button() {
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        console.log(userData);
        if (!isfollowing){
            var data={
                'UserName1' : userData.username,
                'UserName2' : username,
            }
            var response= await Axios.post(backURL+'/follow/',data);
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
            console.log(response);
        }
    }

    
    return(
        <div className = "profile">
            <div className='profilebox'>
                <div className='ImageBox'>
                    <img className='ProfileImg' src={profimg} alt="Profile"/>
                </div>
                <div className='Uname_bio_box'>
                    <div className ='UnameField'>
                        {username}

                    </div>
                    
                    <div className='biobox'> {bio}</div>
                    <button className='FollowButton' id={isfollowing? 'UF':'F'} onClick={Button} >{isfollowing? 'Odpratite korisnika':'Zapratite korisnika'}</button>
                </div>
                

            </div>
        </div>

    );
    
}




export default Profile;
