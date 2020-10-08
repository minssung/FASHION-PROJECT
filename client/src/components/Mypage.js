import React, { Component } from 'react';
import './CSS/Mypage.css';
import {IconButton, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Mypage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    removeCookie() {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location = "/";
    }

    render(){
        return (
            <div className="mypage-container">
                <div className="mypage-header">
                    <div className="mypage-logo">
                        <img src="/images/LOGO3.PNG" alt="logo" />
                    </div>
                    <div className="home-icon">
                        <Link to="/">
                            <IconButton>
                                <img width="40px" src="/images/home-icon.png" alt="homeicon"/>
                            </IconButton>
                        </Link>
                    </div>
                    <div className="user-profile">
                        <IconButton>
                            <img width="45px" src="/images/user-photo.png" alt="userphoto"/>
                        </IconButton>
                    </div>
                </div>

                <div className="user-area">
                    <div className="user-info">
                        <div className="user-profile-img"></div>
                        <div className="user-profile-setting">
                            <IconButton>
                            <img width="30px" src="/images/setting.PNG" alt="setting"/>
                            </IconButton>
                        </div>
                        <div className="user-name">nick</div>
                        <div className="user-comment">user comment</div>
                        <table className="user-history">
                            <tr>
                                <td>게시글</td>
                                <td>팔로워</td>
                                <td>팔로우</td>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </table>
                        
                        {/* <div className="profile-edit">
                            <Button variant="outlined">프로필 편집</Button>
                        </div> */}
                        <div className="mypage-logout">
                            <button onClick={() => this.removeCookie()}>로그아웃(임시)</button>
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
export default Mypage;