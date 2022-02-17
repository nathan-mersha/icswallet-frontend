import React from 'react';
import { useState,useContext} from 'react';
import { sendMoney } from '../api/api';
import { ShowNotification } from '../App';
import LoadingButton from './LoadingButton';

const SendMoney = ({ setTrnHistory }) => {

  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const showNotification = useContext(ShowNotification)
  const clearForm = async () => {
    setTo("")
    setAmount("")
    setReason("")
  }

  const onSend = async () => {


    if (to === "") {
      showNotification("Receiever must not be empty","error")
      return
    }
    if (amount === "") {
      showNotification("Amount must not be empty", "error")
      return
    }

    setLoading(true)
    const sendMoneyBody = {
      "amount": amount,
      "payload": { "reason": reason },
      "to_user_email": to
    }

    const res = await sendMoney(sendMoneyBody)
    const resBody = await res.json()
    const random = Math.random() * 10000
    setTrnHistory(random)
    showNotification(resBody.message ?? resBody.detail, "info")

    setLoading(false)
    clearForm()
  }

  return <div>
    <div className='flex flex-col space-y-7 justify-end'>

      <h3 className='font-bold'>Send Money</h3>

      <input placeholder='to (email)' className='border-b focus:outline-none' value={to} onChange={(e) => { setTo(e.target.value) }} />
      <input placeholder='amount' className='border-b' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
      <input placeholder='reason' className='border-b' value={reason} onChange={(e) => { setReason(e.target.value) }} />

      {
        loading ?
          <LoadingButton text={"processing"}/> :
          <button className='bg-blue-900 text-white px-7 rounded-md py-1 mb-5' onClick={onSend}>
            Send
          </button>
      }


    </div>
  </div>;
};

export default SendMoney;
