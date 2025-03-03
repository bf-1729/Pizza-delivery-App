import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from '../actions/userActions'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Navbar from '../components/Navbar'
import "./loginscreen.css"

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
            const user = {
                email,password
            }
            dispatch(loginUser(user))
    }
  return (
    <div className='login_main'>
      <Navbar/>
        <div className='row justify-content-center login_container'>
            <div className='col-md-5 mt-3 text-left shadow-lg p-3 mb-5 bg-white rounded'>
              <center>
                <h2 className='headers'>Login</h2>
                </center>
                <div className=''>

                    <input 
                    type='email' 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    placeholder='Email' 
                    className='form-control mt-2'></input>

                    <input 
                    type='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required 
                    placeholder='password' 
                    className='form-control mt-2'></input>
                    <button onClick={login} className='btn btn-primary btn-sm btn-red w-100 mt-2 p-2' style={{fontSize:"17px",backgroundColor:"blue"}}>Login</button>

                </div>
                <div className='mt-4'>
                <span>Don't have an account?</span>
                <a href='/register' style={{textDecoration:"none"}}>Register Here</a></div>
            </div>
        </div>
    </div>
  )
}

export default Loginscreen