import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import {useParams} from "react-router-dom";
import "../styles/AddRecipe.css";

const backURL = 'http://127.0.0.1:8000'; // Backend URL

function useFormField(initialValue) {
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (newValue) => setValue(newValue.target.value);
    return { value, onChange: handleChange };
}

function AddRecipe() {
    return (
        <div className='addRecipe_box'>
            <div className='addRecipe_form'>
                {RecipeForm()}
            </div>
        </div>
    );
}


function RecipeForm() {
    const recipeName = useFormField('');
    const portionSize = useFormField('');
    const cookingTime = useFormField('');
    const {id} = useParams();

    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [cookingSteps, setCookingSteps] = useState([{ description: '', imageDescription: '', image: null }]);

    // Get the username from session storage
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const username = userData.username;

    // Set the current date as the submission date
    const submissionDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = value;
        setIngredients(updatedIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    const handleCookingStepChange = (index, field, value) => {
        const updatedCookingSteps = [...cookingSteps];
        updatedCookingSteps[index][field] = value;
        setCookingSteps(updatedCookingSteps);
    };

    const handleAddCookingStep = () => {
        setCookingSteps([...cookingSteps, { description: '', imageDescription: '', image: null }]);
    };

    const handleRemoveCookingStep = (index) => {
        const updatedCookingSteps = [...cookingSteps];
        updatedCookingSteps.splice(index, 1);
        setCookingSteps(updatedCookingSteps);
    };

    const handleImageUpload = async (index, file) => {
        const updatedCookingSteps = [...cookingSteps];
        //alert("image upload")

        if (file) {
            const base64String = await convertImageToBase64(file);
            updatedCookingSteps[index].image = base64String;
            alert(base64String)
            setCookingSteps(updatedCookingSteps);
        }
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result.split(',')[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form fields
        if (!recipeName.value || !portionSize.value || !cookingTime.value || !cookingSteps.every(step => step.description && step.imageDescription && step.image)) {
            // Handle form validation error (you can show an error message)
            return;
        }

        try {
            // Send a POST request to your backend API to save the recipe
            const data = {
            'recipeName': recipeName.value,
            'portionSize': portionSize.value,
            'cookingTime': cookingTime.value,
            'submissionDate': submissionDate,
            'username': username,
            'idcookbook': id,
            'ingredients': JSON.stringify(ingredients),
            'cookingSteps': JSON.stringify(cookingSteps),
            }

            const response = await Axios.post(`${backURL}/add_recipe/`, data);

            if (response.status === 201) {
                alert("Recipe successfully added to the database");
            } else {
                alert("Problem with database entry");
            }
            // You can also reset the form fields after successful submission
            recipeName.onChange('');
            portionSize.onChange('');
            cookingTime.onChange('');
            setIngredients([{ name: '', quantity: '' }]);
            setCookingSteps([{ description: '', imageDescription: '', image: null }]);

        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error adding recipe:', error);
        }
    };

    return (
        <form className='cookbook_info_form' onSubmit={handleSubmit}>
            <h1 className='hTitle'> Add Recipe</h1>

            <label htmlFor='recipeName' className='labelTx2'>Recipe Name:</label>
            <input type='text' id='recipeName' {...recipeName} required></input>

            <label htmlFor='portionSize' className='labelTx2'>Portion Size:</label>
            <input type='number' id='portionSize' {...portionSize} required></input>

            <label htmlFor='cookingTime' className='labelTx2'>Cooking Time:</label>
            <input type='time' id='cookingTime' {...cookingTime} required></input>

            <div className='ingredients'>
                <h2>Ingredients:</h2>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className='ingredient-row'>
                        <label htmlFor={`ingredientName${index}`}>Ingredient Name:</label>
                        <input
                            type='text'
                            id={`ingredientName${index}`}
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        />
                        <label htmlFor={`ingredientQuantity${index}`}>Quantity:</label>
                        <input
                            type='text'
                            id={`ingredientQuantity${index}`}
                            value={ingredient.quantity}
                            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                        />
                        {index > 0 && (
                            <button type='button' onClick={() => handleRemoveIngredient(index)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type='button' onClick={handleAddIngredient}>
                    Add Ingredient
                </button>
            </div>


            <div className='cooking-steps'>
                <h2>Cooking Steps:</h2>
                {cookingSteps.map((step, index) => (
                    <div key={index} className='cooking-step-row'>
                        <label htmlFor={`stepDescription${index}`}>Step Description:</label>
                        <textarea
                            id={`stepDescription${index}`}
                            value={step.description}
                            onChange={(e) => handleCookingStepChange(index, 'description', e.target.value)}
                            required
                        />

                        <label htmlFor={`stepImageDescription${index}`}>Image Description:</label>
                        <textarea
                            id={`stepImageDescription${index}`}
                            value={step.imageDescription}
                            onChange={(e) => handleCookingStepChange(index, 'imageDescription', e.target.value)}
                            required
                        />

                        <label htmlFor={`stepImage${index}`}>Image:</label>
                        <input
                            type='file'
                            accept='image/*'
                            id={`stepImage${index}`}
                            onChange={(e) => handleImageUpload(index, e.target.files[0])}
                            required
                        />

                        {index > 0 && (
                            <button type='button' onClick={() => handleRemoveCookingStep(index)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type='button' onClick={handleAddCookingStep}>
                    Add Cooking Step
                </button>
            </div>

            <p>Submission Date: {submissionDate}</p>
            <p>Username: {username}</p>

            <button type='submit' id='S123'>Submit</button>
        </form>
    );
}

export default AddRecipe;
