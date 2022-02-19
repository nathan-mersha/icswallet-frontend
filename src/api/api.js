const baseURL = "https://icswallet.tk"

const login = async (data) => {
    const url = `${baseURL}/user/login`
    const res = await fetch(url, {
        method : 'POST',
        headers: {
            "content-type" : "application/json",
        },
        body : JSON.stringify(data)
    })
    const resBody = await res.json()
    const parsed = JSON.parse(JSON.stringify(resBody))

    return parsed
}

const signup = async (data) => {
    const url = `${baseURL}/user/signup`
    const res = await fetch(url, {
        method : 'POST',
        headers: {
            "content-type" : "application/json",
        },
        body : JSON.stringify(data)
    })
    const resBody = await res.json()
    const parsed = JSON.parse(JSON.stringify(resBody))

    return parsed
}

const updateProfile = async(data) => {
    const token = localStorage.getItem("token")
    const url = `${baseURL}/user/update_profile`
    const res = await fetch(url,{
        method : "PUT",
        headers: {
            "token" : token,
            "content-type" : "application/json"
        },
        body: JSON.stringify(data)
    })

    return res
}

const forgotPassword = async (data) => {
    const url = `${baseURL}/user/forgot_password`
    const res = await fetch(url, {
        method : 'POST',
        headers: {
            "content-type" : "application/json",
        },
        body : JSON.stringify(data)
    })
    return res
}

const resetPassword = async (data) => {
    const url = `${baseURL}/user/reset_password`
    const res = await fetch(url, {
        method : 'POST',
        headers: {
            "content-type" : "application/json",
        },
        body : JSON.stringify(data)
    })
    return res
}

const getUserData = async () => {
    const token = localStorage.getItem('token')
    console.log("token is : ", token)
    if(token === null || token === ""){
        return null
    }

    const url = `${baseURL}/user/detail`
    const res = await fetch(url, {
        method : 'GET', 
        headers : {
            "token" : token
        }
    })

    return res
}


const getTransactions = async() => {
    const token = localStorage.getItem("token")
    const url = `${baseURL}/transaction/get_all`

    const trnRes = await fetch(url, {
        method: 'GET',
        headers: {
            token: token
        }
    })
    return trnRes
}
const sendMoney = async(sendMoneyData) => {
    const token = localStorage.getItem("token")
    const url = `${baseURL}/transaction/send_money`
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(sendMoneyData),
        headers: {
            "content-type" : "application/json",
            token: token,
        }
    })
    return res
}

const getInsight = async() => {
    const token = localStorage.getItem("token")
    const url = `${baseURL}/transaction/insight`
    const res = await fetch(url, {
        method: 'GET',
        headers:{
            token : token
        }
    })
    return res
}

const requestMoney = async(requestMoneyData) => {
    console.log(requestMoneyData)
    const token = localStorage.getItem("token")
    const url = `${baseURL}/transaction/request_money`
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestMoneyData),
        headers: {
            "content-type" : "application/json",
            token: token,
        }
    })
    return res
    
}


export {login, signup, forgotPassword, resetPassword, getUserData,updateProfile, getTransactions, sendMoney, getInsight, requestMoney}

