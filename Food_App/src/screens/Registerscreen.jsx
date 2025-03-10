import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../actions/userActions'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'

function Registerscreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    const registerstate = useSelector(state => state.registerUserReducer)
    const { loading } = registerstate
    const dispatch = useDispatch()

    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Password validation (minimum 6 characters, at least one number)
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/

    const register = () => {
        if (name.length < 4) {
            toast.error("Name must be at least 4 characters long")
        }
        else if (!email.match(emailPattern)) {
            toast.error("Enter a valid email address")
        } else if (!password.match(passwordPattern)) {
            toast.error("Password must be at least 6 characters long and contain at least one number")
        }
        else if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter.");
        }
        else if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter.");
        }
        else if (password !== cpassword) {
            toast.error("Passwords do not match")
        } else {
            const user = { name, email, password }
            dispatch(registerUser(user))
        }
    }

    return (
        <div className='register_main'>
            <Navbar />
            <div className='register_container'>
                <div className='mt-3 text-left'>
                    <center><h2 className='headers'>Register</h2></center>
                    <div className='register_form'>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder='Name'
                            className='form_controls'
                        />
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete='off'
                            placeholder='Email'
                            className='form_controls'
                        />
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password'
                            className='form_controls'
                        />
                        <input
                            type='password'
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)}
                            required
                            placeholder='Confirm Password'
                            className='form_controls'
                        />
                        <button
                            onClick={register}
                            className='register_button'
                            disabled={loading}
                        >
                            Register
                        </button>
                        <div className='mt-2'>
                            <span>Already have an account?</span>
                            <a className='links' href="/login"> Login Here</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registerscreen
