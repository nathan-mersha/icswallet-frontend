import React from 'react';
import logo from '../rsr/logo.png'
import {useState, useContext} from 'react'
import {resetPassword} from '../api/api'
import { useNavigate, useLocation } from "react-router-dom";
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai'
import LoadingButton from './LoadingButton';
import { ShowNotification } from '../App';


const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation();

  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const showNotification = useContext(ShowNotification)
  const [passwordHidden, setPasswordHidden] = useState(true)

  const onPasswordHiddenClick = () => {
    setPasswordHidden(!passwordHidden)
  }
  const onResetPassword = async () => {
    
    if (resetCode == ""){
        showNotification("please enter reset code sent to your email", "error")
        return
    }

    if (newPassword == ""){
        showNotification("please enter new password")
        return
    }
    setLoading(true)
    const email = location.state.email
    const response = await resetPassword({
        "email" : email,
        "reset_code" : resetCode,
        "new_password" : newPassword
    })

    const resBody = await response.json()
    const parsed = JSON.parse(JSON.stringify(resBody))
  
    setLoading(false)
    if (parsed.detail){
      showNotification(parsed.detail,"error")
      clearFields()
      return
    }

    navigate("/login", { replace: true })
    // routing to home page
  }

  const clearFields = () => {
    setResetCode("")
    setNewPassword("")
  }

  return <div className='bg-gray-300 h-screen flex flex-col justify-center items-center'>
    <div className='bg-white rounded-2xl shadow-lg w-80 h-[30rem]   flex flex-col justify-around items-center'>
      <div>
        <img src={logo} width={70} />
      </div>

      <div className='w-full px-14'>
        <div className='flex flex-col justify-around space-y-4'>
          <input type='text' placeholder='reset code' className='border-b focus:outline-none' value={resetCode} onChange={(e)=>{setResetCode(e.target.value)}}  />
          
          <div className='border-b'>
          <input type={passwordHidden ? "password" : "text"} placeholder='new password' className='focus:outline-none ' value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>
          <button onClick={() => {onPasswordHiddenClick()}}>
            {
              passwordHidden ? <AiFillEye/> : <AiFillEyeInvisible/>
            }
          </button>
          </div>

        </div>
      </div>
      <div>
        <div className='flex flex-col items-center'>

          {
            loading ? 
            <LoadingButton text="reseting password"/> :
            <button type='submit' className='bg-blue-900 hover:bg-blue-700 text-white rounded-sm shadow-md py-1 text-sm w-full' onClick={()=>{
              onResetPassword()
            }}> Reset Password </button>
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

export default ResetPassword;
