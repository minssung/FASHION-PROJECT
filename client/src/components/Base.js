import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';
import './CSS/Base.css';

import { useCookies } from 'react-cookie';

function Base() {
    // 초기 state
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    
    const [cookies, setCookies] = useCookies(['name']);

    // state 변경 함수
    const setSignupForm = () => setSignup(true);
    const setLoginForm = () => setSignup(false);
    const loginFunc = () => setLogin(true);
    // const logoutFunc = () => setLogin(false);

    useEffect(() => {
        // 유저 쿠키 확인
        async function fetchCookie() {
            const result = await axios({
                method: 'post',
                url: 'http://localhost:5000/verify',
                headers: {
                    'content-type' : 'text/json',
                    'x-access-token': cookies.user
                }
            });
            console.log(result);
        }
        fetchCookie()
    }, [cookies], [setCookies]);

    return (
        <div className="main-container">
            <div className="main-logo">bpop</div>
            {
                login ?
                <div className="main-body">
                    hi
                </div>
                :
                <div className="main-body">
                    {
                        // 회원가입 페이지 ON OFF
                        !signup ?
                        <Login signup={setSignupForm} login={loginFunc}/>
                        :
                        <Signup signup={setLoginForm}/>
                    }
                </div>
            }
        </div>
    );
}

export default Base;
