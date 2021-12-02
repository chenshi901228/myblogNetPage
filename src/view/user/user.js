
import { useState, useEffect } from 'react'

import { Request } from '../../utils/axiosRequest'

export default function User(props) {
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        const getUserInfo = async () => {
            let data = await Request("getUserInfo", "post", { name: "小黑不简单" })
            console.log(data)
            setUserInfo(data)
        }
        getUserInfo()
    }, [])
    async function login() {
        props.history.push({ pathname: "/classifyContent", state: { id: 0 } })
        let data = await Request("login", "post", { userName: "小黑不简单", password: "12345678" })
        if (data.status === "ok") {
            localStorage.setItem("userInfo", JSON.stringify(data.userInfo))
        }
    }
    return (
        <div>
            <p>用户名:{userInfo.userName}</p>
            <p>密码:{userInfo.password}</p>
            <p>邮箱:{userInfo.email}</p>
            <p>手机:{userInfo.phone}</p>
            <button onClick={() => { login() }}>Login</button>
        </div>
    )
}