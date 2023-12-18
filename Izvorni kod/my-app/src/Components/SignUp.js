//modules imports
import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
//css imports
import '../styles/SignUp.css';
//component imports

//global val
const backURL='http://127.0.0.1:8000'//backend URL

function useFormField(initialValue) {
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (newValue) => setValue(newValue.target.value);
    return { value, onChange: handleChange };
}

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
        if(selectedFile){
        setImgUrl(URL.createObjectURL(selectedFile));
        }
        else{
            URL.revokeObjectURL(imgUrl);
            setImgUrl('');
        }
    }

    function handleSubmit(e){
        var data;
        e.preventDefault(); // staps default behaviour
        var incorrect = false;
        if(roll.value === 'LVL1'){
            data={
                'Name' : fname.value,
                'Surname' : surname.value,
                'UserName' : username.value,
                'Password' : password.value,
                'PasswordC' : passwordC.value,
                'Roll' : roll.value
            }
        }else
            data={
                'Name' : fname.value,
                'Surname' : surname.value,
                'Email' : email.value,
                'UserName' : username.value,
                'Password' : password.value,
                'PasswordC' : passwordC.value,
                'Bio' : bio.value,
                'ImgName' : file.name,
                'ImgType' : file.type,
                'Img' : file,
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
            // Check if the username is taken in the backend using Axios
            Axios.post(backURL+'/check_username/', {username : data['UserName']})
            .then((response) => {
                if (response.data.taken) {
                    alert('Korisničko ime je zauzeto.');
                    return false;
                }
            })
            .catch((error) => {
                console.error('Error checking username:', error);
            });
            return true;
        }
        function toDataBase(data) {
            // Implement the upload to the database using Axios
            Axios.post(backURL+'/save_SignUp/', data)
                .then((response) => {
                    console.log('Data saved successfully:');
                    alert("Uspjesna registracija");
                })
                .catch((error) => {
                    console.error('Error saving data:', error);
                    alert("Problem u komunikaciji s bazom");
                });
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

export default SignUp;