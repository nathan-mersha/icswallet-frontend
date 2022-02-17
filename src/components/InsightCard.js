import React from 'react';
import {AiFillDashboard} from 'react-icons/ai'
import {useState,useEffect} from 'react'
import { getInsight } from '../api/api';
const InsightCard = () => {

  const [lastWeekSpending, setLastWeekSpending] = useState(0)
  const [lastWeekIncome, setLastWeekIncome] = useState(0)

  useEffect(async ()=>{
    const response = await getInsight()
    const body = await response.json()

    console.log("Credit is : ", body.credit)
    setLastWeekSpending(body.credit)
    setLastWeekIncome(body.debit)
  },[])

  return <div className='flex lg:flex-col  justify-around items-center bg-slate-900 rounded-lg my-4 shadow-xl py-5 lg:my-0 lg:px-6 lg:h-full'>
  <AiFillDashboard className='text-white h-10 w-10'/>
  <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
    <h3 className='text-white text-sm font-bold'>$ {lastWeekSpending}</h3>
    <h3 className='text-white text-sm'>Last week spending</h3>
  </div>

  <div className='h-8 w-1 lg:w-0 bg-slate-500'></div>

  <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
    <h3 className='text-white text-sm font-bold'>$ {lastWeekIncome}</h3>
    <h3 className='text-green-400 text-sm lg:text-xs'>Last week income</h3>
  </div>
</div>;
};

export default InsightCard;
