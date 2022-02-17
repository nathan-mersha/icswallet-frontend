import React from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

const CustomNotification = ({message, type}) => {
  const cardStyle = `px-4 py-2 shadow-lg rounded-sm flex items-center space-x-3 ${type === "info" ? "bg-green-600" : "bg-red-600" }`
  return <div className={cardStyle}>

    <AiFillInfoCircle className='text-white h-6 w-6'/>
    <h1 className='text-white'>{message}</h1>
  </div>;
};

export default CustomNotification;
