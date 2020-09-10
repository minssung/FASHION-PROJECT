import React, { Component } from 'react';
import './CSS/UserInfo.css';
import Setting from '../image/setting.PNG';
import Heart from '../image/heart.PNG';
import { Button } from '@material-ui/core';
import {IconButton} from '@material-ui/core';



class UserInfo extends Component{
    render(){
        return (
            <div className="all">
            
                <div className="header">
                    <div className="logo"></div>
                    
                    <div className="home-icon"></div>
                    
                    <div className="user-profile"></div>
                </div>
                <div className="user-area">
                    <div className="user-info">
                        <div className="myinfo">내 정보</div>
                        <div className="user-profile-img"></div>
                        <div className="user-profile-setting">
                            <IconButton>
                            <img width="30px" src={Setting}/>
                            </IconButton>
                        </div>
                        <p>username</p>
                        {/* <img className="heart" src={Heart}/> */}
                        <div className="heart">
                        <IconButton color="secondary">
                        <img width="30px" src={Heart}/>
                        </IconButton>
                        </div>
                        <p className="heart-num">100</p>
                        <div className="user-history">
                            <p className="history1">게시글</p>
                            <p className="history2">팔로워</p> 
                            <p className="history3">팔로우</p>
                        </div>
                        <div className="user-coment">
                            <p>user coment</p>
                        </div>
                        <div className="profile-edit">
                        <Button variant="outlined">프로필 편집</Button>
                        </div>
                    </div>
                    <div className="user-posting">
                        유저 포스팅
                    </div>
                </div>
            </div>
        )
    }
} 
export default UserInfo;