import React from 'react';
import logo from '../rsr/logo.png'
import {useState, useContext} from 'react'
import {forgotPassword} from '../api/api'
import { useNavigate } from "react-router-dom";
import LoadingButton from './LoadingButton';
import { ShowNotification } from '../App';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const showNotification = useContext(ShowNotification)

  const onForgotPassword = async () => {
    
    setLoading(true)
    if(email == ""){
      showNotification("Email must not be empty", "error")
      setLoading(false)
      return
    }

    const response = await forgotPassword({email})
  
    const resBody = await response.json()
    const parsed = JSON.parse(JSON.stringify(resBody))

    setLoading(false)
    
    if (response.detail){
      
      showNotification(response.detail, "error")
      return
    }

    if (response.ok){
      console.log("ok navigate to reset page")
      navigate("/reset_password", { replace: true, state : {email : email}})
    }
    
    setEmail("")
   
  }
  
  return <div className='bg-gray-300 h-screen flex flex-col justify-center items-center'>
    <div className='bg-white rounded-2xl shadow-lg w-80 h-[30rem]   flex flex-col justify-around items-center'>
      <div>
        <img src={logo} width={70} />
      </div>
      <div className=' w-full px-14'>
        <div className='flex flex-col justify-around'>
          <input type='text' placeholder='email' className='border-b mb-5 focus:outline-none' value={email} onChange={(e)=>{setEmail(e.target.value)}}  />
        </div>
      </div>
      <div className='w-full'>
        <div className='flex flex-col items-center px-14'>


          {
            loading ? 
            <LoadingButton text="sending code"/> : 
            <button type='submit' className='bg-blue-900 hover:bg-blue-700 text-white rounded-sm shadow-md py-1 text-sm w-full' onClick={()=>{
              onForgotPassword()
            }}> Reset Password </button>
          }


          <div className='flex pt-2'>
            <p className='text-slate-700 text-sm mr-2'>Back to</p>
            <a href='#' className='text-black hover:text-slate-700 text-sm font-bold' onClick={()=> {navigate("/login", { replace: false })}}>login</a>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default ForgotPassword;
