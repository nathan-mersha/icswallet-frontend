import React from 'react';
import Transaction from './Transaction';
import { useEffect, useState } from 'react';
import { getTransactions } from '../api/api';


const TransactionHistory = ({ trnHistory, moreTransactions, setMoreTransactions }) => {
    const onMoreClicked = () => {
        setMoreTransactions(!moreTransactions)
    }
    const [transactions, setTransactions] = useState([])
    useEffect(async () => {
        // get transactions
        const transactions = await getTransactions()
        const parsedTransactions = await transactions.json()
        setTransactions(parsedTransactions)
    }, [trnHistory])

    return <div className=' mt-4 p-4 lg:mt-0 h-screen rounded-lg lg:rounded-xl lg:shadow-lg overflow-x-hidden lg:flex-1 bg-slate-200 lg:px-6 lg:py-5'>
        <div className='flex justify-between'>
            <h2 className='font-bold text-gray-800 text-lg lg:hidden'>Recent Transactions</h2>
            <button className='text-cyan-500 text-sm lg:hidden' onClick={() => {onMoreClicked()}}>{moreTransactions ? "Less" : "More"}</button>
        </div>

        <div>
            {
            transactions.length == 0 ?
                <div>
                    <h4>No transactions</h4>
                </div> :
                transactions.map((transaction) => {
                    return <Transaction transaction={transaction} key={transaction.id} />
                })
        }
        </div>
        
    </div>;
};

export default TransactionHistory;
