//module imports
import React from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
//css imports
import '../styles/Login.css';



//global val
const backURL='http://127.0.0.1:8000'//backend URL

function Login(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData&&(userData.lvl === 1 || userData.lvl === 2 ||userData.lvl === 3||userData.lvl === 4)){
        return(
            <div>
                <h1>Zabranjen Pristup</h1>
            </div>
        );
    }
    return(
        <div className  = "login_box">
            <div className='login_form'>
                {Form()}
            </div>
        </div>
    );
}

function Form(){
    // variables
    const username = useFormField('');
    const password = useFormField('');
    const navigate = useNavigate();
           


    return(
        <form className='LINform' onSubmit={handleSubmit}>
            <h1 id='hTitle'>LogIn</h1> 
            <label htmlFor="username" id='username' className='labelTx'>Korisničko ime:</label>
            <label htmlFor="password" id='password' className='labelTx'>Lozinka:</label>
            <input type='text' id='username' name='username' title='Korisničko ime' placeholder='Korisničko ime' {...username} required></input>
            <input type="password" id="password" name="password" placeholder="Lozinka" {...password} required></input>
            <input type='submit' name='submitButton' id='submitButton'></input>
        </form>
    );


    async function handleSubmit(e){
        e.preventDefault(); // staps default behaviour
        var data={
            'UserName' : username.value,
            'Password' : password.value,
        }
        console.log('Username:', data['UserName']);
        console.log('Password:', data['Password']);
        console.log(await validateLogIn(data))
        if(await validateLogIn(data)){
            //console.log(await getUserData(data))
            sessionStorage.setItem("userData",await getUserData(data))
            alert('Uspjesna prijava');
            navigate("/");
            window.location.reload();
        }
        else{
            alert('Krivo upisani podatci');
        }

        async function validateLogIn(data) {
            // Use Axios to check the credentials against the backend
            var response = await Axios.post(backURL+'/check_login/', data);
                    console.log(response.data);
                    return response.data.valid;
        }

        async function getUserData(data){
            try{
                var response = await Axios.post(backURL+'/get_user_data/', data);
                //console.log(JSON.stringify(response.data));
                return JSON.stringify(response.data);
            }
            catch(error){
                console.error('Error geting data: ', error);
            }
        }

    }

}

function useFormField(initialValue) {
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (e) => setValue(e.target.value);
    return { value, onChange: handleChange };
}

export default Login;
