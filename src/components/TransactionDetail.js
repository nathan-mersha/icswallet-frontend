import React from 'react'
import TransactionHistory from './TransactionHistory'
import dateFormat from "dateformat";

const TransactionDetail = ({ setShowTransactionDetail, transaction }) => {
    const email = localStorage.getItem("email")
    const amountStyle = `font-bold text-lg ${email === transaction.from_user.email ? "text-red-600" : "text-green-600"}`
    const amountPrefix = email === transaction.from_user.email ? "-$" : "+$"
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-md rounded-md "
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">

                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col justify-between bg-white outline-none focus:outline-none">

                        <div className='w-96 py-5 px-4 space-y-5'>
                            <h1 className='grow  text-center text-lg font-semibold text-gray-700 items-start'>Transaction Detail</h1>

                            <div className='flex flex-col space-y-4'>
                                <div>
                                    <h4 className='font-bold'>From</h4>
                                    <h5 className='text-gray-600'>{transaction.from_user["name"]}</h5>
                                    <h5 className='text-sm text-gray-600'>{transaction.from_user["email"]}</h5>
                                </div>

                                <div>
                                    <h4 className='font-bold'>To</h4>
                                    <h5 className='text-gray-600'>{transaction.to_user["name"]}</h5>
                                    <h5 className='text-sm text-gray-600'>{transaction.to_user["email"]}</h5>
                                </div>

                                <div>
                                    <h4 className='font-bold'>Reason</h4>
                                    <h5 className='text-sm text-gray-600'>{transaction.payload["reason"] === undefined || transaction.payload["reason"] === "" ? "no reason provided" : transaction.payload["reason"]}</h5>
                                </div>

                                <div>
                                    <h4 className='font-bold'>Amount</h4>
                                    <h5 className={amountStyle}><span className='text-sm'>{amountPrefix}</span>{transaction.amount}</h5>
                                </div>

                                <div>
                                    <h4 className='font-bold'>Time</h4>
                                    <h5 className='text-sm text-gray-600'>{dateFormat(transaction.first_modified)}</h5>
                                </div>
                            </div>

                        </div>
                        <div className='bg-slate-100 py-3 flex space-x-2 justify-between px-4 border-t-2 rounded-md items-center'>
                            <h4 className='text-xs text-gray-600'>{transaction.id}</h4>
                            <button className='border bg-white rounded-md px-6 py-2' onClick={() => { setShowTransactionDetail(false) }}>Close</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default TransactionDetail