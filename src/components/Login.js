import React from 'react';
import logo from '../rsr/logo.png'
import { useState,useContext } from 'react'
import { login } from '../api/api'
import { useNavigate } from "react-router-dom";
import LoadingButton from './LoadingButton';
import { ShowNotification } from '../App';
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai'


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const showNotification = useContext(ShowNotification)
  const onLogin = async () => {
    
    setLoading(true)
    const response = await login({ email, password })

    if (response.detail) {
      showNotification(response.detail, "error")
      setLoading(false)
      return
    }

    localStorage.setItem("token", response.token)
    localStorage.setItem("email", response.email)
    localStorage.setItem("userId", response.userId)

    setEmail("")
    setPassword("")
    setLoading(false)
    navigate("/home", { replace: true })
    

  }

  const onPasswordVisibilityClick = () => {
    console.log("eye clicked")
    setPasswordVisibility(!passwordVisibility)
  }
  return <div className='bg-gray-300 h-screen flex flex-col justify-center items-center'>
    <div className='bg-white rounded-2xl shadow-lg w-80 h-[30rem] flex flex-col justify-around items-center'>
      <div>
        <img src={logo} width={70} />
      </div>

      <div className=''>
        <div className='flex flex-col justify-around'>
          <input type='text' placeholder='email' className='border-b mb-5 focus:outline-none' value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <div className='flex border-b'>
          <input type={passwordVisibility ? "password" : "text"} placeholder='password' className='focus:outline-none' value={password} onChange={(e) => {setPassword(e.target.value) }}/>
          <button onClick={() => {onPasswordVisibilityClick()}}>
            {passwordVisibility ? <AiFillEye className='text-gray-500'/> : <AiFillEyeInvisible className='text-gray-500'/>}
          </button>
          </div>
              
            
        </div>
      </div>
      <div>
        <div className='flex flex-col items-center'>


          {
            loading ?

              <LoadingButton text={"processing"} /> :
              <button type='submit' className='bg-blue-900 hover:bg-blue-700 text-white rounded-sm shadow-md py-1 text-sm w-full' onClick={() => {
                onLogin()
              }}> Login </button>

          }


          <div className='flex pt-2'>
            <p className='text-slate-700 text-sm mr-2'>Forgot password?</p>
            <a href='#' className='text-black hover:text-slate-700 text-sm font-bold' onClick={() => { navigate("/forgot_password", { replace: false }) }}>click here</a>
          </div>

          <a href='#' className='text-slate-400 hover:text-slate-500 text-sm' onClick={() => { navigate("/signup", { replace: false }) }}>Don't have account?</a>

        </div>
      </div>

    </div>

  </div>;
};

export default Login;
