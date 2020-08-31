import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import './CSS/Base.css';

function Base() {
    // 초기 state
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);

    // state 변경 함수
    const setSignupForm = () => setSignup(true);
    const setLoginForm = () => setSignup(false);
    const loginFunc = () => setLogin(true);
    // const logoutFunc = () => setLogin(false);

    // == componentDidMount()
    useEffect(() => {

    }, []);

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
