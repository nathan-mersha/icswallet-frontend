import React, { useState, useContext } from 'react';
import { ShowNotification } from '../App';
import { requestMoney } from '../api/api';
import LoadingButton from './LoadingButton';

const Receive = () => {

  const [requestEmail, setRequestEmail] = useState("")
  const [requestAmount, setRequestAmount] = useState("")
  const [requestReason, setRequestReason] = useState("")

  const [busy, setBusy] = useState(false)

  const showNotification = useContext(ShowNotification)
  const onRequestClicked = async () => {
    if (requestEmail === "") {
      showNotification("Email must not be empty")
      return
    }

    if (requestAmount === "") {
      showNotification("Amount must not be empty")
      return
    }

    setBusy(true)
    // perform transaction
    const requestBody = {
      "amount": requestAmount,
      "payload": {
        "reason": requestReason
      },
      "to_user_email": requestEmail
    }

    const requestAmountResponse = await requestMoney(requestBody)
    const resBody = await requestAmountResponse.json()

    if (resBody.detail) {
      showNotification(resBody.detail, "error")
    }
    if (resBody.message) {
      showNotification(resBody.message, "info")
    }
    clearFields()
    setBusy(false)


  }

  const clearFields = () => {
    setRequestEmail("")
    setRequestAmount("")
    setRequestReason("")
  }
  return <div className='flex flex-col space-y-6'>

    <h4 className='font-bold text-slate-900'>Reqeuest Money</h4>

    <input type="text" className='border-b focus:outline-none' placeholder="email" value={requestEmail} onChange={(e) => { setRequestEmail(e.target.value) }} />
    <input type="text" className='border-b focus:outline-none' placeholder="amount" value={requestAmount} onChange={(e) => { setRequestAmount(e.target.value) }} />
    <input type="text" className='border-b focus:outline-none' placeholder="reason" value={requestReason} onChange={(e) => { setRequestReason(e.target.value) }} />

    {

      busy ?
        <LoadingButton text={"Processing"} /> :
        <button className='bg-blue-700 text-white py-1 shadow-sm rounded-md' onClick={() => { onRequestClicked() }}>Request</button>

    }
  </div>;
};

export default Receive;
