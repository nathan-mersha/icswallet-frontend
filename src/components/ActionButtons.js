import React from 'react';
import { CgArrowLongUpE, CgArrowLongDownE } from 'react-icons/cg';
import { BsBagCheckFill } from 'react-icons/bs'
import { useState } from 'react';


const ActionButtons = ({ onSendClicked, onPurchaseClicked, onReceivedClicked, onBackClicked}) => {

    const [selectedAction, setSelectedAction] = useState("")
    const [backVisible, setBackVisible] = useState(false)
    const deSelectedIconSize = "w-16 h-16"
    const selectedIconSize = "w-20 h-20"
    return <div className='flex flex-col'>


<div className='flex justify-between lg:justify-start px-6 pb-3 lg:mt-6 lg:space-x-9'>
        <div className='flex flex-col items-center'>
            <button className= {`bg-blue-900 rounded-full flex items-center justify-center shadow-xl ${selectedAction === "send" ? selectedIconSize : deSelectedIconSize}`}  onClick={() => { 
                setSelectedAction("send");
                setBackVisible(true)
                onSendClicked() }}>
                <CgArrowLongUpE className='text-white h-96 w-10' />
            </button>
            <h3 className='text-xs text-gray-500'>send</h3>
        </div>

        <div className='flex flex-col items-center'>
            <button className={`bg-green-500 rounded-full flex items-center justify-center shadow-xl ${selectedAction === "purchase" ? selectedIconSize : deSelectedIconSize }`} onClick={() => { 
                setSelectedAction("purchase");
                setBackVisible(true)
                onPurchaseClicked() }}>
                <BsBagCheckFill className='text-white h-60 w-8' />
            </button>
            <h3 className='text-xs text-gray-500'>purchase</h3>
        </div>
        <div className='flex flex-col items-center'>
            <button className={`bg-blue-900 rounded-full flex items-center justify-center shadow-xl ${selectedAction === "recieve" ? selectedIconSize : deSelectedIconSize }`} onClick={() => { 
                setSelectedAction("recieve")
                setBackVisible(true)
                onReceivedClicked() }}>
                <CgArrowLongDownE className='text-white h-96 w-10' />
            </button>
            <h3 className='text-xs text-gray-500'>recieve</h3>
        </div>
    </div>

    <div className={backVisible ? 'block self-end' : 'hidden'}>
        <button className='text-blue-500 py-4' onClick={()=>{
            onBackClicked()
            setBackVisible(false)
        }}>back</button>
    </div>
    </div>;
};

export default ActionButtons;
