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

      </Routes>
    </Router> 
  );
}

export default App;
