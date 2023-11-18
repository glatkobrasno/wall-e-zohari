//module imports
import React from 'react';
import Axios from 'axios';
//css imports
import '../styles/Login.css';



//global val
const backURL=''//backend URL

function Login(){
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


    function handleSubmit(e){
        e.preventDefault(); // staps default behaviour
        var data={
            'UserName' : username.value,
            'Password' : password.value,
        }
        console.log('Username:', data['UserName']);
        console.log('Password:', data['Password']);
        if(!checkDataBase){
            alert('Krivo upisani podatci');
        }
        else{
            alert('Uspjesna prijava');
        }

        function checkDataBase(data) {
            // Use Axios to check the credentials against the backend
            Axios.post(backURL+'/check_login/', data)
                .then((response) => {
                    if (response.data.correct) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch((error) => {
                    console.error('Error checking credentials:', error);
                    alert('Pogreška prilikom provjere podataka');
                });
        }
    }

}

function useFormField(initialValue) {
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (e) => setValue(e.target.value);
    return { value, onChange: handleChange };
}

export default Login;