import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { registerUser } from '../actions/userActions'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'

function Registerscreen() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [cpassword,setCpassword] = useState('')
    const registerstate = useSelector(state=>state.registerUserReducer)
    const {loading} = registerstate
    const dispatch = useDispatch()

    function register(){
        if(password != cpassword){
            toast.error("Password not matched")
        }
        else{
            const user = {
                name,email,password
            }
            dispatch(registerUser(user))
            
        }
    }
  return (
    <div className='register_main'>
        <Navbar/>
        <div className='row justify-content-center register_container'>
            <div className='col-md-5 mt-3 text-left shadow-lg p-3 mb-5 bg-white rounded'>
                <center><h2 className='headers'>Register</h2></center>
                <div className=''>
                    <input
                     type='text'
                     value={name}
                     onChange={(e)=>setName(e.target.value)}
                     required 
                     placeholder='Name' 
                     className='form-control mt-4'></input>

                    <input 
                    type='email' 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    autoComplete='off'
                    placeholder='Email' 
                    className='form-control mt-2'></input>

                    <input 
                    type='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required 
                    placeholder='password' 
                    className='form-control mt-2'></input>

                    <input
                     type='text'
                     value={cpassword}
                     onChange={(e)=>setCpassword(e.target.value)}
                     required
                     placeholder='Confirm password' 
                     className='form-control mt-2'></input>
                     
                    <button onClick={register} className='btn btn-primary btn-sm btn-red w-100 mt-2 p-2' style={{fontSize:"17px",backgroundColor:"blue"}}>Register</button>
                    <div className='mt-2'>
                    <span>Already have an account?</span>
                    <a style={{textDecoration:"none"}} href="/login">Login Here</a>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Registerscreen