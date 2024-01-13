import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import "../styles/AddDiet.css"

const backURL='http://127.0.0.1:8000'//backend URL


function AddDiet(){
    return(
        <div className='addDiet_box'>
            <div className='addDiet_form'>
                {DietForm()}
            </div>
        </div>
    );
}
function useFormField(initialValue) {
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (newValue) => setValue(newValue.target.value);
    return { value, onChange: handleChange };
}


function DietForm(){

    const DietName=useFormField("");
    const MinCals=useFormField("");
    const MaxCals=useFormField("");
    const Desc=useFormField("");
    const MinCarbs=useFormField("");
    const MaxCarbs=useFormField("");
    const MinFats=useFormField("");
    const MaxFats=useFormField("");
    const MinAcids=useFormField("");
    const MaxAcids=useFormField("");
    const MinSugars=useFormField("");
    const  MaxSugars=useFormField("");
    const MinProtein=useFormField("");
    const MaxProtein=useFormField("");
    const DailyMaxCals=useFormField("");
    const DailyMaxCarbs=useFormField("");
    const DailyMaxFats=useFormField("");
    const DailyMaxAcids=useFormField("");
    const DailyMaxProtein=useFormField("");
    const DailyMaxSugar=useFormField("");

    async function handleSubmit(e){
        e.preventDefault();
        var data;
        data={
            'DietName':DietName.value,
            'MinCals' : MinCals.value ,
            'MaxCals' : MaxCals.value ,
            'Desc' : Desc.value ,
            'MinCarbs' : MinCarbs.value ,
            'MaxCarbs' : MaxCarbs.value ,
            'MinFats' : MinFats.value ,
            'MaxFats' : MaxFats.value ,
            'MinAcids' : MinAcids.value ,
            'MaxAcids' : MaxAcids.value ,
            'MinSugars' : MinSugars.value ,
            'MaxSugars' : MaxSugars.value ,
            'MinProtein' : MinProtein.value ,
            'MaxProtein' : MaxProtein.value ,
            'DailyMaxCals' : DailyMaxCals.value ,
            'DailyMaxCarbs' : DailyMaxCarbs.value ,
            'DailyMaxFats' : DailyMaxFats.value ,
            'DailyMaxAcids' : DailyMaxAcids.value ,
            'DailyMaxProtein' : DailyMaxProtein.value ,
            'DailyMaxSugar' : DailyMaxSugar.value ,
        };
        Axios.post(backURL+"/add_diet/", data)
        .then(((response) => {
            alert("dijeta je uspjesno dodana u bazu podataka");
        }))
        .catch((response) => {
            alert("problem sa upisom u bazu");
        })

    }
    return(
        <form className='Diet_info_form' onSubmit={handleSubmit}>
            <h1 className='hTitle'>Izrada dijete</h1>
            <label htmlFor='DietName' className='LabelTx2'>Ime Djete:</label>
            <input type='text' name='DietName'  {...DietName} required />

            <label htmlFor='MaxCals' className='LabelTx2'>Maksimalno kalorija:</label>
            <input type='text' name='MaxCals'   {...MaxCals} required />

            <label htmlFor='MinCals' className='LabelTx2'>Minimalno kalorija:</label>
            <input type='text' name='MinCals'  {...MinCals} required />

            <label htmlFor='MaxCarbs' className='LabelTx2'>Maksimalno ugljikohidrata:</label>
            <input type='text' name='MaxCarbs'  {...MaxCarbs} required />

            <label htmlFor='MinCarbs' className='LabelTx2'>Minimalno ugljikohidrata:</label>
            <input type='text' name='MinCarbs'  {...MinCarbs} required />

            <label htmlFor='MaxFats' className='LabelTx2'>Maksimalno masnoće:</label>
            <input type='text' name='MaxFats'  {...MaxFats} required />

            <label htmlFor='MinFats' className='LabelTx2'>Minimalno masnoće:</label>
            <input type='text' name='MinFats'  {...MinFats} required />

            <label htmlFor='MaxProtein' className='LabelTx2'>Maksimalno bjelanćevina:</label>
            <input type='text' name='MaxProtein'  {...MaxProtein} required />

            <label htmlFor='MinProtein' className='LabelTx2'>Minimalno bjelanćevina:</label>
            <input type='text' name='MinProtein'  {...MinProtein} required />

            <label htmlFor='MaxSugars' className='LabelTx2'>Maksimalno šećera:</label>
            <input type='text' name='MaxSugars'  {...MaxSugars} required />

            <label htmlFor='MinSugars' className='LabelTx2'>Minimalno šećera:</label>
            <input type='text' name='MinSugars'  {...MinSugars} required />

            <label htmlFor='MaxAcids' className='LabelTx2'>Maksimalno zasićenih masnih kiselina:</label>
            <input type='text' name='MaxAcids'  {...MaxAcids} required />

            <label htmlFor='MinAcids' className='LabelTx2'>Minimalno zasićenih masnih kiselina:</label>
            <input type='text' name='MinAcids'  {...MinAcids} required />

            <label htmlFor='DailyMaxCals' className='LabelTx2'>Dnevna granica kalorija:</label>
            <input type='text'  name='DailyMaxCals' {...DailyMaxCals} required />

            <label htmlFor='DailyMaxCarbs' className='LabelTx2'>Dnevna granica ugljikohidrata:</label>
            <input type='text' name='DailyMaxCarbs'  {...DailyMaxCarbs} required />

            <label htmlFor='DailyMaxFats' className='LabelTx2'>Dnevna granica masnoća:</label>
            <input type='text' name='DailyMaxFats'  {...DailyMaxFats} required />

            <label htmlFor='DailyMaxProtein' className='LabelTx2'>Dnevna granica bjelanćevina:</label>
            <input type='text' name='DailyMaxProtein'  {...DailyMaxProtein} required />

            <label htmlFor='DailyMaxSugars' className='LabelTx2'>Dnevna granica šećera:</label>
            <input type='text' name='DailyMaxSugars'  {...DailyMaxSugar} required />

            <label htmlFor='DailyMaxAcids' className='LabelTx2'>Dnevna granica zasičenih masnih kiselina:</label>
            <input type='text' name='DailyMaxAcids'  {...DailyMaxAcids} required />

            <label htmlFor='Desc' className='LabelTx2'>Opis:</label>
            <textarea type='text' name='Desc'  {...Desc} required />
            <input type='submit' id='S12' required/>
        </form>

    );


}

export default AddDiet;
