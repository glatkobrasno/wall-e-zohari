//modules imports
import React from 'react';
import { useState } from 'react';
//css imports
import '../styles/SignUp.css'
//component imports


function useFormField(initialValue) {
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (e) => setValue(e.target.value);
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
    const fname = useFormField('');
    const surname = useFormField('');
    const email = useFormField('');
    const username = useFormField('');
    const password = useFormField('');
    const passwordC = useFormField('');
    const bio = useFormField('');
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
            'ImgType' : file.type
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
    }

    return(
        <form className='SUPform' onSubmit={handleSubmit}>
            <h1 id='hTitle'>SignUp</h1> 
            <input type='text' id='fname' name='fname' title='Ime' placeholder='Ime' {...fname} required></input>
            <input type='text' id='surname' name='surname' title='Prezime' placeholder='Prezime' {...surname} required></input>
            <input type='email' id='mail' name='email' title='email' placeholder='Upisite email adresu' {...email} required></input>
            <input type='text' id='username' name='username' title='Korisničko ime' placeholder='Korisničko ime' {...username} required></input>
            <input type="password" id="password" name="password" placeholder="Lozinka" {...password} required></input>
            <input type="password" id="passwordC" name="passwordC" placeholder="Potvrdite svoju lozinku" {...passwordC} required></input>
            <textarea id="bio" name='bio' placeholder='Upišite kratki životopis ...' {...bio} required ></textarea>
            <input type='file' name='profImg' id='upload' onChange={handleImage} accept='image/*' required></input>
            <img src ={imgUrl}  className='imgprev' alt='uploaded.img'></img>
            <input type='submit' name='submitButton' id='submitButton'></input>
        </form>
    );

}

export default SignUp;