import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import UserInfo from './UserInfo';
import Home from './Home';
import axios from 'axios';
import './CSS/Base.css';

import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Base() {
    // 초기 state
    /**
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    */
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [cookies, setCookies] = useCookies(['name']);

    // state 변경 함수
    /**
    const setSignupForm = () => setSignup(true);
    const setLoginForm = () => setSignup(false);
    const loginFunc = () => setLogin(true);
    */
    // const logoutFunc = () => setLogin(false);

    useEffect(() => {
        try {
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
                setUser(result.data);
            }
            fetchCookie();
            
        } catch (err) {
            console.log('mount', err)
        }
        

        setLoading(true);

    }, [cookies], [setCookies]);

    return (
        <div className="main-container">
            {
                loading &&
                <Router>
                    <Switch>
                        <Route exact path="/" render={() => <Home user={user} />} />
                        <Route path="/insert" render={() => <Signup />} />
                        <Route path="/mypage/nick" render={() => <UserInfo />} />
                    </Switch>
                </Router>
            }
            
            

            {/* <div className="main-body">
                {
                // 회원가입 페이지 ON OFF
                !signup ?
                <Login signup={setSignupForm} login={loginFunc}/>
                :
                <Signup signup={setLoginForm}/>
                }
            </div> */}
        </div>
    );
}

export default Base;
