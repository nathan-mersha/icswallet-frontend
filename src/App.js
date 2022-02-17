import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import CustomNotification from './components/CustomNotification';
import UpdateProfile from './components/UpdateProfile';

export const ShowNotification = React.createContext()

function App() {

  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationType, setNotificationType] = useState("")

  const onShowNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 2000)
  }


  return (
    <ShowNotification.Provider value={onShowNotification}>
      <div>
        {
          showNotification ? <CustomNotification message={notificationMessage} type={notificationType} /> : <div></div>
        }

        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/update_profile" element={<UpdateProfile/>} />
          </Routes>
        </Router>
      </div>

    </ShowNotification.Provider>
  );
}

export default App;
