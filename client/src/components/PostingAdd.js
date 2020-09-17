import React, { Component } from 'react';
import './CSS/Home.css';
import Logo from '../image/logo2.PNG';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import SearchIcon from '../image/search-icon.png';
import PostingAddBtn from '../image/posting-add-btn.png';
import { Typography, IconButton} from '@material-ui/core';

class PostingAdd extends Component{
    
    render(){
     return (
        <div className="full-page">
        <from>
        <div className="left-page">
            <div className="header">
                <div className="logo">
                    {/* <img src={Logo} height="70px"/> */}
                </div>
            </div>
            
            <div className="left-page-posting">
                이미지 선택 창 업데이트 예정
            </div>
        </div>
        <div className="right-page">
            <div className="nullbox"></div>
            <div className="tag-selection">
                <p>원하는 태그 선택</p>
                <div className="tag-selection-box">
                    <from>
                        <ul>
                            <div className="line4"></div>
                            <li><Button style={{fontSize:'18px',fontWeight:'bold'}}>상의</Button></li>
                            <li><Button>반팔</Button></li>
                            <li><Button>셔츠</Button></li>
                            <li><Button>후드티</Button></li>
                            <li><Button>스웨트</Button></li>
                            <li><Button>기타</Button></li>
                        </ul>
                        <div className="line1"></div>
                        <ul>
                            <li><Button style={{fontSize:'18px',fontWeight:'bold'}}>아우터</Button></li>
                            <li><Button>코트</Button></li>
                            <li><Button>후드집업</Button></li>
                            <li><Button>가디건</Button></li>
                            <li><Button>자켓</Button></li>
                            <li><Button>패딩</Button></li>
                        </ul>
                        <div className="line2"></div>
                        <ul>
                            <li><Button style={{fontSize:'18px',fontWeight:'bold'}}>하의</Button></li>
                            <li><Button>데님</Button></li>
                            <li><Button>스커트</Button></li>
                            <li><Button>슬랙스</Button></li>
                            <li><Button>레깅스</Button></li>
                            <li><Button>기타</Button></li>
                        </ul>
                        <div className="line3"></div>
                        <ul>
                            <li><Button style={{fontSize:'18px',fontWeight:'bold'}} >신발</Button></li>
                            <li><Button>운동화</Button></li>
                            <li><Button>구두</Button></li>
                            <li><Button>스니커즈</Button></li>
                            <li><Button>샌들</Button></li>
                            <li><Button>기타</Button></li>
                        </ul>
                    </from>
                </div>
            </div>
            <div className="hot-posting">
                <p>내용 입력</p>
                    <textarea></textarea>
                    <div className="save">
                        <Button variant="contained" size="large">저장</Button>
                    </div>
            </div>
        </div>
        </from>
        <footer className="footer">
            <Typography variant="body2" color="textSecondary" align="center">
            {'긴머리와 파마머리 '+new Date().getFullYear()+' 졸업작품 프로젝트'}
            </Typography>
        </footer>
    
    </div>
     );
    };
};
export default PostingAdd;