import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import Mypage from './Mypage';
import Home from './Home';
import axios from 'axios';
import './CSS/Base.css';
import PostingAdd from './PostingAdd';
import NotFound from './NotFound';
import BestPosting from './BestPosting';

import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Base() {
    const [user, setUser] = useState('');               // user 개인
    const [userArray, setUserArray] = useState([]);     // user 전체
    const [loading, setLoading] = useState(true);
    const [cookies, setCookies] = useCookies(['name']); // 로그인 정보
    const [posting, setPosting] = useState([]);

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

                return result.data;
            }
            fetchCookie()
            .then(async (id) => {
                const user_id = id.user_id;
                const result = await axios.get(`http://localhost:5000/users/one?emailId=${user_id}`);
                setUser(result.data);

                // // 초기 마운트 끝 부분 로딩완료.
                setLoading(false); 
            })
            // .then(
            //     postingData(),
            //     allUser()
            // )
            // .then(() => {
            //     setLoading(false);
            // })

            async function allUser() {
                const result = await axios.get('http://localhost:5000/users/all');
                const users = result.data;
                setUserArray(users);
            }
            allUser();

            async function postingData(){
                const result = await axios.get(`http://localhost:5000/posting`);

                // const getNick = await result.data.map(async data => {
                //     const res = await axios.get(`http://localhost:5000/users/one?emailId=${data.writer}`);
                //     data.writer = res.data.nick;
                //     return data
                // });

                // const promise = await Promise.all([result, getNick]).then(value => {
                //     setPosting(value[0].data);
                //     console.log(value[0].data)
                // })
                setPosting(result.data);
                console.log(result.data);
            }
            postingData();

            
        } catch (err) {
            console.log('mount', err)
        }

    }, [cookies], [setCookies]);

    return (
        <div className="main-container">
            {
                !loading ?
                <div>
                    <Router>
                        <Switch>
                            <Route exact path="/" render={() => <Home user={user} posting={posting}/>} />
                            <Route path="/insert" render={() => <Signup />} />
                            {userArray.map((data, i) => {
                                return <Route key={i}
                                    path={`/${data.nick}`}
                                    render={() => <Mypage user={user} pageUser={data} posting={posting} />} 
                                />
                            })}
                            { user && <Route path="/postingAdd" render={() => <PostingAdd user={user} /> } />}
                            
                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </div>
                :
                <div></div>
            }
        </div>
    );
}

export default Base;
