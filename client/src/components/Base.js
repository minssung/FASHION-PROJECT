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
        console.log(signup);
    })

    return (
        <div>
            <div className="main-logo">bpop</div>
            {
                !signup ?
                <Login signup={setSignupForm}/>
                :
                <Signup signup={setLoginForm}/>
            }
        </div>
    );
}

export default Base;
