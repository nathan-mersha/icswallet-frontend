import React from 'react';

import CardPayment from './Card';
import InsightCard from './InsightCard';
import TransactionHistory from './TransactionHistory';
import Profile from './Profile';
import ActionButtons from './ActionButtons';
import SendMoney from './SendMoney';
import { useEffect, useState } from 'react';
import { getUserData } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Purchase from './Purchase';
import Receive from './Receive';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('wss://icswallet.tk/ws');

export const Notifications = React.createContext()

const Home = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({})
  const [trnHistory, setTrnHistory] = useState(0)
  const [displayedPage, setDisplayedPage] = useState("recieve")
  const [actionFormsVisibility, setActionFormVisibility] = useState(false)
  const [transactionVisibility, setTransactionVisibility] = useState(true)
  const [notificationData, setNotificationData] = useState([])
  const [moreTransactions, setMoreTransactions] = useState(false)


  const onSendClicked = () => {
    setDisplayedPage("send")
    onActionButtonClicked()
  }

  const onPurchaseClicked = () => {
    setDisplayedPage("purchase")
    onActionButtonClicked()
  }

  const onReceivedClicked = () => {
    setDisplayedPage("recieve")
    onActionButtonClicked()
  }

  const onActionButtonClicked = () => {
    setActionFormVisibility(true)
    setTransactionVisibility(false)
  }

  const onBackClicked = () => {
    setActionFormVisibility(false)
    setTransactionVisibility(true)
  }

  useEffect(async () => {
    // get the user by token then render
    const userRes = await getUserData()
    if (userRes === null) {
      navigate("/login", { replace: true })
      return
    }
    const userData = await userRes.json()

    setUserData(userData)
  }, [])

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    client.onopen = () => {
      client.send(userId)
    };
    client.onmessage = (message) => {
      setNotificationData([...notificationData, message])
      client.send(userId)
    };
  }, [notificationData])

  return <Notifications.Provider value={notificationData}>
    <div className='px-10 py-8 flex flex-col  h-screen'>
    <Profile userData={userData} notificationData={notificationData} />
    <div className='lg:flex lg:space-x-8'>
      <div className='flex-1'>
        <div className={`lg:flex lg:space-x-6 ${moreTransactions ? "hidden" : ""}`}>
          <CardPayment userData={userData} />
          <InsightCard />
        </div>
        <ActionButtons onSendClicked={onSendClicked} onPurchaseClicked={onPurchaseClicked} onReceivedClicked={onReceivedClicked} onBackClicked={onBackClicked} />

        <div className={actionFormsVisibility ? "block" : "hidden lg:block"}>
          {
            displayedPage === "send" ?
              <SendMoney setTrnHistory={setTrnHistory} /> :
              displayedPage === "recieve" ?
                <Receive /> :
                <Purchase />
          }
        </div>

      </div>
      <div className={transactionVisibility ? "block" : "hidden lg:block"}>
        <TransactionHistory trnHistory={trnHistory} moreTransactions={moreTransactions} setMoreTransactions={setMoreTransactions} />
      </div>


    </div>

  </div>
  </Notifications.Provider>


};


export default Home;
