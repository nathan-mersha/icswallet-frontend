import React, { useDebugValue } from 'react';
import { IoMdLogOut } from 'react-icons/io'
import { MdNotificationsNone } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Notifications } from './Home';
const Profile = ({ userData, notificationData }) => {
    const navigate = useNavigate()
    const notifications = useContext(Notifications)
    const onLogout = () => {
        localStorage.setItem("token", "")
        navigate("/login", { replace: true })
    }

    const getGreeting = () => {
        var today = new Date()
        var curHr = today.getHours()
        if (curHr < 12) {
            return "Good Morning"
        } else if (curHr < 18) {
            return "Good Afternoon"
        } else {
            return "Good Evening"
        }
    }

    const onNameClick = () => {
        navigate("/update_profile")
    }
    console.log("Notifications are ... ", notifications)
    return <div className='flex justify-between items-center pb-5'>

        <div className=''>
            <h1 className='text-sm font-semibold text-gray-500'>{getGreeting()},</h1>
            <button className='hover:text-blue-500' onClick={()=>{onNameClick()}}><h2 className='text-xl font-bold'>{userData.name}</h2></button>
        </div>

        <div className='flex'>

            <button onClick={()=>{}}>
                <MdNotificationsNone className='h-6 w-6 text-gray-700 mr-3 ' />
                <p className={notificationData.length == 0 ? "hidden" : "block bg-red-700 text-white absolute top-9 right-20 rounded-full w-5 h-5 text-sm"}>{notificationData.length}</p>

            </button>
            <button onClick={() => { onLogout() }}>
                <IoMdLogOut className='h-6 w-6 text-gray-700' />
            </button>


        </div>

    </div>;
};

export default Profile;
