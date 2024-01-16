//modules imports
import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import {useParams} from 'react-router-dom';
//css imports
import '../styles/Profile.css';
//component imports

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

    useEffect(() => {
	fetchData();
    }, []);

    var isfollowing;
    const fetchData = async () => {
	var data={
            'UserName' : username,
	}
	const response = await getProfileData(data);
	let userData = sessionStorage.getItem("userData");
	if (userData) {
	    data={
		'UserName1' : userData.username,
		'UserName2' : username,
	    }
	    isfollowing = await Axios.post(backURL+'/is_following/', data);
	    console.log(isfollowing);
	}
	console.log(response);
    };
    
    return(
        <div className = "profile">
            <div className ='nez jos'>
                {username}
            </div>
        </div>
    );
    
}

function Button() {
    
}

export default Profile;
