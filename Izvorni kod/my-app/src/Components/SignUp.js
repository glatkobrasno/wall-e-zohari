//modules imports
import React from 'react';
import { useState } from 'react';
//css imports
import '../styles/SignUp.css'
//component imports

function SignUp(){
    return(
        <div className  = "signUp_box">
            <div className='signUp_form'>
                {Form()}
            </div>
        </div>
    );
}


function Form(){

    const [file, setFile]=useState()
    function handleImage(e){
        setFile(URL.createObjectURL(e.target.files[0])) // for image previev
    }

    return(
        <form className='SUPform'>
            <h1 id='hTitle'>SignUp</h1> 
            <input type='text' id='name' name='name' title='Ime' placeholder='Ime' required></input>
            <input type='text' id='surname' name='surname' title='Prezime' placeholder='Prezime' required></input>
            <input type='email' id='mail' name='email' title='email' placeholder='Upisite email adresu' required></input>
            <input type='text' id='username' name='username' title='Korisničko ime' placeholder='Korisničko ime' required></input>
            <input type="password" id="password" name="password" placeholder="Lozinka" required></input>
            <input type="password" id="passwordC" name="passwordC" placeholder="Potvrdite svoju lozinku" required></input>
            <textarea id="bio" name='bio' placeholder='Upišite kratki životopis ...' required ></textarea>
            <input type='file' name='profImg' id='upload' onChange={handleImage} accept='image/*' required></input>
            <img src ={file}  className='imgprev' alt='uploaded.img'></img>
            <input type='submit' name='submitButton' id='submitButton'></input>
        </form>
    );

}

export default SignUp;