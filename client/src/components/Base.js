import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';

function Base() {
    // 초기 state
    const [signup, setSignup] = useState(false);

    // state 변경 함수
    const setSignupForm = () => setSignup(true);
    const setLoginForm = () => setSignup(false);

    // == componentDidMount()
    useEffect(() => {

    })

    return (
        <div>
            <div className="main-logo">bpop</div>
            {
                // 회원가입 페이지 ON OFF
                !signup ?
                <Login signup={setSignupForm}/>
                :
                <Signup signup={setLoginForm}/>
            }
        </div>
    );
}

export default Base;
