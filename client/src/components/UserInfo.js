import React, { Component } from 'react';
import './CSS/UserInfo.css';
import Setting from '../image/setting.PNG';
import HomeIcon from '../image/home-icon.png';
import UserPhoto from '../image/user-photo.png';
import { Button } from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import { Typography} from '@material-ui/core';


class UserInfo extends Component{
    render(){
        return (
            <div className="all">
                <div className="header">
                    <div className="logo"></div>
                    <div className="home-icon">
                        <IconButton>
                            <img width="40px" src={HomeIcon}/>
                        </IconButton>
                    </div>
                    <div className="user-profile">
                        <IconButton>
                            <img width="45px" src={UserPhoto}/>
                        </IconButton>
                    </div>
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
                        <p className="user-name">username</p>
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
                <footer className="footer">
                <Typography variant="body2" color="textSecondary" align="center">
                {'긴머리와 파마머리 '+new Date().getFullYear()+' 졸업작품 프로젝트'}
                </Typography>
                </footer>
            </div>
        )
    }
} 
export default UserInfo;