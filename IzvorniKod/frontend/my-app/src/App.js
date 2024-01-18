//node modules import
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom'; 
import React from 'react';
//css imports
import './styles/App.css';
//component imports
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import AddProduct from './Components/addProduct';
import Profile from './Components/Profile';
import AddDiet from './Components/addDiet';
import CommentFields from './Components/CommentFields';
import Cookbook from './Components/Cookbook';
import AddCookbook from './Components/addCookbook';
import AddRecipe from './Components/addRecipe';
import Recipe from './Components/Recipe';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path='/' element={<div><Header/><Home/><Footer/></div>}></Route>
          <Route exact path='/Login' element={<div><Header/><Login/><Footer/></div>}></Route>
          <Route exact path='/SignUp' element={<div><Header/><SignUp/><Footer/></div>}></Route>
          <Route exact path='/AddProduct' element={<div><Header/><AddProduct/><Footer/></div>}></Route>
          <Route path='/Profile/:username' element={<div><Header/><Profile/><Footer/></div>}></Route>
          <Route exact path='/AddDiet' element ={<div><Header/><AddDiet/><Footer/></div>}></Route>
          <Route exact path='/cookbook/:type/:id' element={<div><Header/><Cookbook/><CommentFields/><Footer/></div>}></Route>
          <Route exact path='/AddCookbook' element ={<div><Header/><AddCookbook/><Footer/></div>}></Route>
          <Route exact path='/AddRecipe' element ={<div><Header/><AddRecipe/><Footer/></div>}></Route>
          <Route exact path='/Cookbook/:type/:id' element={<div><Header/><Cookbook/><CommentFields/><Footer/></div>}></Route>
          <Route exact path='/Recipe/:type/:id' element={<div><Header/><Recipe/><CommentFields/><Footer/></div>}></Route>
      </Routes>
    </Router> 
  );
}

export default App;
