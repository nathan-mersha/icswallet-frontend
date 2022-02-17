import React from 'react';
import dateFormat from "dateformat";
import TransactionDetail from './TransactionDetail';
import { useState } from 'react';
const Transaction = ({ transaction }) => {

    const [showTransactionDetail, setShowTransactionDetail] = useState(false)
    const email = localStorage.getItem("email")
    const amountStyle = `font-bold ${email === transaction.from_user.email ? "text-red-600" : "text-green-600"}`
    const amountPrefix = email === transaction.from_user.email ? "-$" : "+$"
    return <div>

        {showTransactionDetail ? (
            <TransactionDetail setShowTransactionDetail={setShowTransactionDetail} transaction={transaction} />
        ) : null}

        <div className='flex justify-between items-center py-4 border-b border-gray-300'>
            <div className='flex'>
                <button onClick={()=> {setShowTransactionDetail(true)}}>
                    <div className='flex'>
                        <div className='h-9 w-9 bg-slate-400 rounded-full mr-3 flex justify-center items-center text-white font-semibold'>
                            {transaction.to_user.name.substr(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h4 className='font-bold text-gray-800'>{transaction.to_user.name}</h4>
                            <h5 className='text-gray-800 text-xs'>{dateFormat(transaction.first_modified)}</h5>
                        </div>
                    </div>
                </button>
            </div>
            <h5 className={amountStyle}>{amountPrefix}{transaction.amount}</h5>
        </div>
        <div className='w-full bg-slate-300 lg:bg-slate-400'>

        </div>
    </div>;
};

export default Transaction;
