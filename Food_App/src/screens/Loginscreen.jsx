import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from '../actions/userActions'
import Navbar from '../components/Navbar'
import "./loginscreen.css"
import { toast } from 'react-toastify'

function Loginscreen() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const loginstate = useSelector(state=>state.loginUserReducer)
    const {loading,error} = loginstate

    const dispatch = useDispatch()

    useEffect(()=>{
      if(localStorage.getItem("currentUser"))
      {
        window.location.href = "/"
      }
    },[])

    function login(){
      if(email.length<1){
        toast.error("Enter Email")
      }
      else if(password.length < 1){
        toast.error("Enter Password")
      }
      else{
            const user = {
                email,password
            }
            dispatch(loginUser(user))
    }
  }
  return (
    <div className='login_main'>
      <Navbar/>
        <div className='login_container'>
            <div className='mt-3 text-left'>
              <center>
                <h2 className='headers'>Login</h2>
                </center>
                <div className='login_form'>

                    <input 
                    type='email' 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    placeholder='Email' 
                    className='form_controls'></input>

                    <input 
                    type='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required 
                    placeholder='password' 
                    className='form_controls'></input>
                    <button onClick={login} className='login_button'>Login</button>

                </div>
                <div className='mt-2 footers'>
                <span>Don't have an account?</span>
                <a className='links' href='/register'> Register Here</a></div>
            </div>
        </div>
    </div>
  )
}

export default Loginscreen