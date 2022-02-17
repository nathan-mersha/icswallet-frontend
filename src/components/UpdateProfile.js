import React from 'react';
import logo from '../rsr/logo.png'
import { useState, useContext, useEffect } from 'react'
import LoadingButton from './LoadingButton';
import { useNavigate } from "react-router-dom";
import { ShowNotification } from '../App';
import { updateProfile, getUserData } from '../api/api';

const SignUp = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const showNotification = useContext(ShowNotification)


    useEffect(async () => {
        // get user data and populate
        const userData = await getUserData()
        if (!userData) {
            navigate("/login", { replace: true })
            return
        }
        const response = await userData.json()
        setName(response.name)
    }, [])

    const onUpdateUser = async () => {

        if (name === "") {
            showNotification("please enter name", "error")
            return
        }
        setLoading(true)
        const updateData = {
            "name": name,
        }
        const response = await updateProfile(updateData)

        if (response.detail) {
            showNotification(response.detail, "error")
            setLoading(false)
            return
        }

        // todo : call api to update profile here
        setLoading(false)
        navigate("/home", { replace: true })
        // routing to home page
    }

    const clearFields = () => {
        setName("")
    }

    return <div className='bg-gray-300 h-screen flex flex-col justify-center items-center'>
        <div className='bg-white rounded-2xl shadow-lg w-80 h-[30rem]   flex flex-col justify-around items-center'>
            <div>
                <img src={logo} width={70} />
            </div>

            <div className='w-full px-14'>
                <div className='flex flex-col justify-around space-y-4'>
                    <input type='text' placeholder='name' className='border-b focus:outline-none' value={name} onChange={(e) => { setName(e.target.value) }} />



                </div>
            </div>
            <div>
                <div className='flex flex-col items-center'>

                    {
                        loading ?
                            <LoadingButton text="signing up" /> :
                            <button type='submit' className='bg-blue-900 hover:bg-blue-700 text-white rounded-sm shadow-md py-1 text-sm w-full px-6' onClick={() => {
                                onUpdateUser ()
                            }}> Update Profile </button>
                    }

                    <div className='flex pt-2'>
                        <a href='#' className='text-black hover:text-slate-700 text-sm font-bold' onClick={() => { navigate("/home", { replace: false }) }}>Go to Home</a>
                    </div>





                </div>
            </div>

        </div>

    </div>;
};

export default SignUp;
