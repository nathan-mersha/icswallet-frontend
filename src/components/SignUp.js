import React from 'react';
import logo from '../rsr/logo.png'
import {useState,useContext} from 'react'
import {signup} from '../api/api'
import LoadingButton from './LoadingButton';
import { useNavigate } from "react-router-dom";
import { ShowNotification } from '../App';
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai'


const SignUp = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const [passwordVisible,setPasswordVisible] = useState(true)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true)

  const showNotification = useContext(ShowNotification)

  const onPasswordVisibleClick = () => {
    setPasswordVisible(!passwordVisible)
  }

  const onConfirmPasswordVisible = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }
  
  const onSignUp = async () => {
    
    if (password !== confirmPassword){
        showNotification("passwords do not match","error")
        clearFields()
        return
    }

    if (name === ""){
        showNotification("please enter name","error")
        return
    }

    if (email === ""){
        showNotification("please enter email","error")
        return
    }
    
    if (password === ""){
        showNotification("please enter password","error")
    }
    setLoading(true)
    const response = await signup({name, email, password})
  
    setLoading(false)
    if (response.detail){
      showNotification(response.detail, "error")
      clearFields()
      return
    }

    navigate("/login", { replace: true })
    // routing to home page
  }

  const clearFields = () => {
    setName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  return <div className='bg-gray-300 h-screen flex flex-col justify-center items-center'>
    <div className='bg-white rounded-2xl shadow-lg w-80 h-[30rem]   flex flex-col justify-around items-center'>
      <div>
        <img src={logo} width={70} />
      </div>

      <div className='w-full px-14'>
        <div className='flex flex-col justify-around space-y-4'>
          <input type='text' placeholder='name' className='border-b focus:outline-none' value={name} onChange={(e)=>{setName(e.target.value)}}  />
          <input type='text' placeholder='email' className='border-b focus:outline-none' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          
          <div className='border-b'>
          <input type={passwordVisible ? 'password' : 'text'} placeholder='password' className='focus:outline-none' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
          <button onClick={() => {onPasswordVisibleClick()}}>
            {passwordVisible ? <AiFillEye className='text-slate-500' /> : <AiFillEyeInvisible className='text-slate-500'/>}
          </button>
          </div>

          <div className='border-b'>
          <input type={confirmPasswordVisible ? 'password' : 'text'} placeholder='confirm password' className='focus:outline-none' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
          <button onClick={() => {onConfirmPasswordVisible()}}>
            {confirmPasswordVisible ? <AiFillEye className='text-slate-500'/> : <AiFillEyeInvisible className='text-slate-500'/>}
          </button>
          </div>
          
        </div>
      </div>
      <div>
        <div className='flex flex-col items-center'>

          {
            loading ?
            <LoadingButton text="signing up"/> :
            <button type='submit' className='bg-blue-900 hover:bg-blue-700 text-white rounded-sm shadow-md py-1 text-sm w-full' onClick={()=>{
              onSignUp()
            }}> Signup </button>
          }

          <div className='flex pt-2'>
            <p className='text-slate-700 text-sm mr-2'>Already have account?</p>
            <a href='#' className='text-black hover:text-slate-700 text-sm font-bold' onClick={()=> {navigate("/login", { replace: false })}}>click here</a>
          </div>


        </div>
      </div>

    </div>

  </div>;
};

export default SignUp;
