import React from 'react';
import { useState } from 'react';
import Axios from 'axios';


const backURL='http://127.0.0.1:8000'//backend URL

function useFormField(initialValue) {
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (newValue) => setValue(newValue.target.value);
    return { value, onChange: handleChange };
}



function addProduct(){
    return(
        <div className='addProd_box'>
            <div className='addProd_form'>
                {ProductForm()}
            </div>
        </div>
    );
}


function ProductForm(){
    
    const [binImg, setBinImg] = useState(null); // stores binary img data
    const [imgUrl, setImgUrl] = useState(''); // for image prepreview
    const Productname= useFormField("");
    const Calories = useFormField("");
    const Fats= useFormField("");
    const Protein= useFormField("");
    const Carbohydrates= useFormField("");
    const Salt= useFormField("");
    const Mass= useFormField("");
    const Acids= useFormField("");
    const Sugars= useFormField("");
    

    function handleImage(e){
        const selectedFile = e.target.files[0];
        
        const reader = new FileReader();
        

        if(selectedFile){
            var fSize=selectedFile.size
            if(fSize > 500000){
                alert('Prevelika Slika, max 0.5 MB')
                URL.revokeObjectURL(imgUrl);
                setImgUrl('');
                e.target.value = null;
            }
            else{
                reader.onloadend = () => {
                    const binaryData = reader.result;
                    const base64String = arrayBufferToBase64(binaryData); // Convert ArrayBuffer to Base64
                    setBinImg(base64String);
                }
            setImgUrl(URL.createObjectURL(selectedFile));
            reader.readAsArrayBuffer(selectedFile);
            }
        }
        else{
            URL.revokeObjectURL(imgUrl);
            setImgUrl('');
        }
        
        function arrayBufferToBase64(arrayBuffer) {
            let binary = '';
            const bytes = new Uint8Array(arrayBuffer);
            for (let i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary);
        }
    }
    async function handleSubmit(e){
        
        e.preventDefault();
        var data;
        data={
            'Productname': Productname.value,
            'Calories': Calories.value,
            'Protein': Protein.value,
            'Fats': Fats.value,
            'Carbohydrates': Carbohydrates.value,
            'Salt': Salt.value,
            'Mass': Mass.value,
            'Acids': Acids.value,
            'Sugars': Sugars.value,
            'Img': binImg,
        };
        Axios.post(backURL+"/add_product/",data)
        .then(((response) => {
            alert("proizvod uspjesno dodan u bazu podataka");
        }))
        .catch((response) => {
            alert("problem sa upisom u bazu");
        })


    }


    return(
        <div className='product_info_form' onSubmit={handleSubmit}>
            <label htmlFor='Productname' className='labelTx'>Naziv proizvoda:</label>
            <label htmlFor='Calories' className='labelTx'>Energija(po 100g):</label>
            <label htmlFor='Fats' className='labelTx'>Masnoće(po 100g):</label>
            <label htmlFor='Protein' className='labelTx'>Bjelanćevine(po 100g):</label>
            <label htmlFor='Carohydrates' className='labelTx'>Ugljikohidrati(po 100g):</label>
            <label htmlFor='Salt' className='labelTx'>Sol(po 100g):</label>
            <label htmlFor='Mass' className='labelTx'>Masa:</label>
            <label htmlFor='Acids' className='labelTx'>Zasićene masne kiseline(po 100g):</label>
            <label htmlFor='Sugars' className='labelTx'>Šećeri(po 100g):</label>
            <label htmlFor='Img' className='labelTx'>Slika:</label>

            <input type='text' name='Productname' required></input>
            <input type='text' name='Calories' required></input>
            <input type='text' name='Fats' required></input>
            <input type='text' name='Protein' required></input>
            <input type='text' name='Carohydrates' required></input>
            <input type='text' name='Salt' required></input>
            <input type='text' name='Mass' required></input>
            <input type='text' name='Acids' required></input>
            <input type='text' name='Sugars' required></input>
            <input type='file' name='Img' required></input>
            <img src={imgUrl} alt='' onChange={handleImage}></img>
            <input type='submit'></input>
        </div>


    ); 
}

export default addProduct;