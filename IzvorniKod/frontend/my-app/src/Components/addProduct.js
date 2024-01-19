import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import "../styles/AddProduct.css";

import conf_back_url from "../configuration.js" 
const backURL=conf_back_url;//backend URL

function useFormField(initialValue) {
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (newValue) => setValue(newValue.target.value);
    return { value, onChange: handleChange };
}



function AddProduct(){
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
        Axios.post(backURL+"/add_product/", data)
        .then(((response) => {
            alert("proizvod uspjesno dodan u bazu podataka");
        }))
        .catch((response) => {
            alert("problem sa upisom u bazu");
        })


    }


    return(
        <form className='product_info_form' onSubmit={handleSubmit}>
            <h1 className='hTitle'> Dodaj proizvod</h1>
            <label htmlFor='Productname' id='Productname' className='labelTx2'>Naziv proizvoda:</label>
            <input type='text' name='Productname' id='Productname' {...Productname}  required></input>

            <label htmlFor='Calories' id='Calories' className='labelTx2'>Energija(po 100g):</label>
            <input type='text' name='Calories' id='Calories' {...Calories} required></input>

            <label htmlFor='Fats' id='Fats' className='labelTx2'>Masnoće(po 100g):</label>
            <input type='text' name='Fats' id='Fats' {...Fats} required></input>

            <label htmlFor='Protein' id='Protein' className='labelTx2'>Bjelanćevine(po 100g):</label>
            <input type='text' name='Protein' id='Protein' {...Protein} required></input>

            <label htmlFor='Carbohydrates' id='Carbohydrates' className='labelTx2'>Ugljikohidrati(po 100g):</label>
            <input type='text' name='Carbohydrates' id='Carbohydrates' {...Carbohydrates} required></input>

            <label htmlFor='Salt' id='Salt' className='labelTx2'>Sol(po 100g):</label>
            <input type='text' name='Salt' id='Salt' {...Salt} required></input>
            
            <label htmlFor='Mass' id='Mass' className='labelTx2'>Masa:</label>
            <input type='text' name='Mass' id='Mass' {...Mass} required></input>

            <label htmlFor='Acids'id='Acids' className='labelTx2'>Zasićene masne kiseline(po 100g):</label>
            <input type='text' name='Acids' id='Acids' {...Acids} required></input>

            <label htmlFor='Sugars' id='Sugars' className='labelTx2'>Šećeri(po 100g):</label>
            <input type='text' name='Sugars' id='Sugars' {...Sugars}  required></input>

            <label htmlFor='Img' id='Img' className='labelTx2'>Slika:</label>

            <input type='file' onChange={handleImage} name='Img' id='Img' accept='.jpg, .jpeg, .png' size="500000" required></input>
            <img className='productImg' src={imgUrl} alt='' id={(imgUrl==='')? 'notsel':'sel'} ></img>
            <input type='submit' id='S123'></input>
        </form>


    ); 
}

export default AddProduct;