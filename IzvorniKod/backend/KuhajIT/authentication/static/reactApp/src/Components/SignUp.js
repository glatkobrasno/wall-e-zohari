//modules imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
//css imports
import '../styles/SignUp.css';
import {Login} from "./Login";
//component imports


function useFormField(initialValue) {
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (newValue) => setValue(newValue.target.value);
    return { value, onChange: handleChange };
}

export function SignUp(){
    return(
        <div className  = "signUp_box">
            <div className='signUp_form'>
                {Form()}
            </div>
        </div>
    );
}


function Form(){
    // variables
    const [file, setFile]=useState(''); // for using file
    const [imgUrl, setImgUrl] = useState(''); // for image prepreview
    const roll = useFormField('LVL');
    const fname = useFormField('');
    const surname = useFormField('');
    const email = useFormField('');
    const username = useFormField('');
    const password = useFormField('');
    const passwordC = useFormField('');
    const bio = useFormField('');

    const [disabledState, setDisabledState] = useState({
        'fname': true,
        'surname': true,
        'email': true,
        'username': true,
        'password': true,
        'passwordC': true,
        'bio': true,
        'file': true,
    });
    // const imgfile = useFormField(null);

    function handleImage(e){
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setImgUrl(URL.createObjectURL(selectedFile));
    }

    function handleSubmit(e){
        e.preventDefault(); // staps default behaviour
        var incorrect = false;
        var data={
            'Name' : fname.value,
            'Surname' : surname.value,
            'Email' : email.value,
            'UserName' : username.value,
            'Password' : password.value,
            'PasswordC' : passwordC.value,
            'Bio' : bio.value,
            'ImgName' : file.name,
            'ImgType' : file.type,
            'Roll' : roll.value
        }
        if(!ifConfirmed()){
            incorrect = true;
            alert('Lozinke se ne poklapaju probajte ponovno.');
        }
        if(!ifUserFree()){
            incorrect = true;
            alert('Korisnićko ime je zauzeto.');
            
        }
        if(!incorrect){
            toDataBase(data);// upload na bazu
            alert('Uspješna prijava');
        }
        console.log('Name:', data['Name']);
        console.log('Surname:', data['Surname']);
        console.log('Email:', data['Email']);
        console.log('Username:', data['UserName']);
        console.log('Password:', data['Password']);
        console.log('Confirmed Password:', data['PasswordC']);
        console.log('Bio:', data['Bio']);
        console.log('Image Name:', data['ImgName']);
        console.log('Image Type:', data['ImgType']);
        console.log('Roll:', data['Roll']);

        function ifConfirmed(){
            if(data['Password'] === data['PasswordC']){
                return true;
            }
            else return false;
        }
        function ifUserFree(){
            // treba provjeriti postoji li user u bazi
            return true;
        }
        function toDataBase(data){
            // implmentirati upload na bazu
            return ;
        }
    }

    function handleRoll(e){
        
        var rollVal = e.target.value;
        roll.onChange(e);
        console.log("Roll:", rollVal);
        if(rollVal === 'LVL'){
            setDisabledState(true);
        }
        else
           if( rollVal === 'LVL1'){
                setDisabledState(false);
                setDisabledState({email : true, file : true, bio : true});
                email.onChange({ target:{ value:''}});
                bio.onChange({ target:{ value:''}});
                setFile(null);
                setImgUrl('');
            }
            else{
                setDisabledState(false);
            }
        console.log("Roll:", disabledState);
    }
   // roll.onChange(handleRoll)

    

    return(
        <form className='SUPform' onSubmit={handleSubmit}>
            <label htmlFor="fname" id='fname' className='labelTx'>Ime:</label>
            <label htmlFor="surname" id='surname' className='labelTx'>Prezime:</label>
            <label htmlFor="mail" id='mail' className='labelTx'> Email:</label>
            <label htmlFor="username" id='username' className='labelTx'>Korisničko ime:</label>
            <label htmlFor="password" id='password' className='labelTx'>Lozinka:</label>
            <label htmlFor="passwordC" id='passwordC' className='labelTx'>Potvrdite lozinku:</label>
            <label htmlFor="bio" id='bio' className='labelTx'>Biografija:</label>

            <h1 id='hTitle'>SignUp</h1> 

            <select id="roll" name="cars"  {...roll}  required onChange={handleRoll}>
                <option value="LVL" disabled>Odaberite</option>
                <option value="LVL1" >Korisnik</option>
                <option value="LVL2">Nutricionist</option>
                <option value="LVL3">Kulinar</option>
            </select>

            <input type='text' id='fname' name='fname' title='Ime' placeholder='Ime' {...fname} disabled={disabledState['fname']} required></input>
            <input type='text' id='surname' name='surname' title='Prezime' placeholder='Prezime' {...surname} disabled={disabledState['surname']} required></input>
            <input type='email' id='mail' name='email' title='email' placeholder='Upisite email adresu' {...email} disabled={disabledState['email']} required></input>
            <input type='text' id='username' name='username' title='Korisničko ime' placeholder='Korisničko ime' {...username} disabled={disabledState['username']} required></input>
            <input type="password" id="password" name="password" placeholder="Lozinka" {...password} disabled={disabledState['password']} required></input>
            <input type="password" id="passwordC" name="passwordC" placeholder="Potvrdite svoju lozinku" {...passwordC} disabled={disabledState['passwordC']} required></input>
            <textarea id="bio" name='bio' placeholder='Upišite kratki životopis ...' {...bio} disabled={disabledState['bio']} required ></textarea>
            <input type='file' name='profImg' id='upload' onChange={handleImage} disabled={disabledState['file']} accept='image/*' required></input>
            <img src ={imgUrl}  className='imgprev' alt='uploaded.img' id={disabledState['file'] ? 'imgDes' : ''}></img>
            <input type='submit' name='submitButton' id='submitButton' disabled={disabledState['fname']}></input>
        </form>
    );

}

function waitForElementToExist(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  });
}

// 👇️ using the function
waitForElementToExist('#signUp_element').then(element => {
  const root = document.getElementById('signUp_element');
  const rootElement = createRoot(root);
  rootElement.render(<SignUp />);
});
