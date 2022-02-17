import React from 'react';
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai'
import whiteLogo from '../rsr/ics_full_white.png'
import { useState } from 'react';

const CardPayment = ({userData}) => {
    const [showBalance, setShowBalance] = useState(false)

    const onShowBalanceToggle = () => {
        setShowBalance(!showBalance)
    }
    return <div className='flex flex-col justify-between bg-blue-900 shadow-lg rounded-xl px-5 py-4 lg:flex-auto'>

        <div className='flex items-start justify-between'>
            <div className='pb-10'>
                <h3 className='text-white font-bold text-sm pb-2'>{userData.name}</h3>
                <h4 className='text-white'>{showBalance ? userData.wallet_id : "**** **** **"}</h4>
            </div>

            <button onClick={()=>{onShowBalanceToggle()}}>
                {
                    showBalance ? 
                    <AiFillEyeInvisible className='h-7 w-7 text-white' />: 
                    <AiFillEye className='h-7 w-7 text-white' />
                }
            </button>
        </div>

        <div className='flex justify-between'>
           
            <div>
                 <h4 className='text-white text-sm'>Balance</h4>
            <h4 className='text-white font-bold'>$ {showBalance ? userData.available_balance : "******"}</h4>
            </div>

            <img className='w-12 h-12' src={whiteLogo}/>
        </div>
    </div>;

};

export default CardPayment;
