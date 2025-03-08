import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./index.css"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Homescreen from './screens/Homescreen';
import Cartscreen from './screens/Cartscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Adminscreen from './screens/Adminscreen';
import Nonvegs from './screens/Nonvegs';
import Vegpizzascreen from './screens/Vegpizzascreen';
import Fruitpizzascreen from './screens/Fruitpizzascreen';
import Parathapizzasscreen from './screens/Parathapizzasscreen';
import Mushroompizzascreen from './screens/Mushroompizzascreen';
import Paneerpizzasscreen from './screens/Paneerpizzasscreen';
import Addressscreen from './screens/Addressscreen';
import Myorders from './screens/Myorders';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <div className='main_container'>
      <ToastContainer/>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      <Routes>
        <Route path='/cart/address' element={<Addressscreen/>}></Route>
        <Route path='/nonvegpizza' element={<Nonvegs/>}></Route>
        <Route path='/vegpizza' element={<Vegpizzascreen/>}></Route>
        <Route path='/fruitpizza' element={<Fruitpizzascreen/>}></Route>
        <Route path='/paneerpizza' element={<Paneerpizzasscreen/>}></Route>
        <Route path='/parathapizza' element={<Parathapizzasscreen/>}></Route>
        <Route path='/mushroompizza' element={<Mushroompizzascreen/>}></Route>
        <Route path='/' element={<Homescreen/>}></Route>
        <Route path='/cart' element={<Cartscreen/>}></Route>
        <Route path='/register' element={<Registerscreen/>}></Route>
        <Route path='/login' element={<Loginscreen/>}></Route>
        <Route path='/admin/*' element={<Adminscreen/>}></Route>
        <Route path='/myorders' element={<Myorders/>}></Route>
      </Routes>
      </Router>
    </div>
  )
}

export default App
