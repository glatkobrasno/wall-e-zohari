import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import "../styles/AddCookbook.css";


const backURL='http://127.0.0.1:8000';//backend URL

function useFormField(initialValue) {
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (newValue) => setValue(newValue.target.value);
    return { value, onChange: handleChange };
}


function AddCookbook(){
    return(
        <div className='addCook_box'>
            <div className='addCook_form'>
                {CookbookForm()}             
            </div>
        </div>
    );
}

function CookbookForm() {
    const CookbookName = useFormField("");
    const CookbookTheme = useFormField("");
    const creationDate = new Date().toISOString().split('T')[0]; // Set current date
    const userData = JSON.parse(sessionStorage.getItem('userData')) // Retrieve username from sessionStorage
    const username = userData.username;

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = {
                'CookbookName': CookbookName.value,
                'CookbookTheme': CookbookTheme.value,
                'CreationDate': creationDate,
                'Username': username,
            };

            const response = await Axios.post(`${backURL}/add_cookbook/`, data);

            if (response.status === 201) {
                alert("Cookbook successfully added to the database");
            } else {
                alert("Problem with database entry");
            }
        } catch (error) {
            alert("An error occurred while submitting the form");
            console.error(error);
        }
    }

    return (
        <form className='cookbook_info_form' onSubmit={handleSubmit}>
            <h1 className='hTitle'> Add Cookbook</h1>
            <label htmlFor='CookbookName' id='CookbookName' className='labelTx2'>Cookbook Name:</label>
            <input type='text' name='CookbookName' id='CookbookName' {...CookbookName} required></input>
 
            <label htmlFor='CookbookTheme' id='CookbookTheme' className='labelTx2'>Cookbook Theme:</label>
            <input type='text' name='CookbookTheme' id='CookbookTheme' {...CookbookTheme} required></input>

            <label htmlFor='CreationDate' id='CreationDate' className='labelTx2'>Creation Date:</label>
            <input type='text' name='CreationDate' id='CreationDate' value={creationDate} readOnly></input>

            <label htmlFor='Username' id='Username' className='labelTx2'>Username:</label>
            <input type='text' name='Username' id='Username' value={username} readOnly></input>

            <input type='submit' id='S123'></input>
        </form>
    );
}


export default AddCookbook;