import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import User from '../../state/User';
import Styles from './Login.module.css';
import Logo from '../../assets/images/logo.png';
import LoginImage from '../../assets/images/google_login.png'
import { useEffect } from 'react';
import Backend from '../../axios/Backend';

const Login = () => {

    const [user, setUser] = useRecoilState(User);

    let win = null;

    useEffect(() => {
        const interval = setInterval(
            async () => {
                if(document.cookie !== "") {
                    const token = document.cookie.replace("data=", "");
                    const userData = await (await Backend("info", {method:"GET", headers: {accessToken: token}})).data;
                    setUser({
                        token: token,
                        googleId: userData.googleId,
                        googleName: userData.googleName,
                        profilePicture: userData.profilePicture,
                    })
                    win.close();
                }
            }, 100
        )
        return () => {
            clearInterval(interval);
        }
    }, [])

    const [screen, setScreen] = useState("init");

    if(screen === "init") {
        return (
            <div className={Styles.mainDiv}>
                <img src={Logo} className={Styles.mainLogo} />
                <p className={Styles.mainText}>서비스 사용을 위해 구글 로그인을 해 주세요</p>
                <img src={LoginImage} className={Styles.loginImage} onClick={() => {
                    win = window.open('http://api.alphaorderly.com:8080/api/google', "PopupWin", "width=500,height=600")
                }}/>
            </div>
        )
    }
}

export default Login;