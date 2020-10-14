import React, { Component } from 'react';
import './CSS/Home.css';
import Button from '@material-ui/core/Button';
import { Typography, IconButton } from '@material-ui/core';
import Login from './Login';
import PostingView from './PostingView';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            preview: "",
            top_tag: "",
            outer_tag: "",
            bottom_tag: "",
            shoes_tag: "",
            content: "",
            loginModal: false,
            nick: '',
            tag: null,      // null: 전체 게시글
        }
    }

    async componentDidMount() {
        this.setState({
            nick: this.props.user.nick,
        });
    }

    componentDidUpdate() {
        console.log('ABC', this.state.tag);
    }
    
    render() {
        const { loginModal, nick, tag } = this.state;
        const { posting } = this.props;

        // console.log(posting[0].nick);
        
        
        return ( 
            <div className="full-page">
                <div className="left-page">
                    <div className="header">
                        <div className="logo">
                            <a href="/">
                                <img src="/images/logo3.PNG" alt="logo"/>
                            </a>
                        </div>
                        <div className="login-btn">
                            {
                                !this.props.user ?
                                <Button type="submit" onClick={() => {this.setState({ loginModal: true });}} variant="contained" color="primary">로그인</Button>
                                :
                                <Link to={`/${nick}`} style={{textDecoration: 'none'}}>
                                    <div className="mypage-btn">My</div>
                                </Link>
                            }
                        </div>
                        {
                            loginModal && <>
                                <div className="login-modal">
                                    <div className="login-modal-close" onClick={() => {this.setState({ loginModal: false })}}>&times;</div>
                                    <Login />
                                </div>
                            </>
                        }
                    </div>
                    <div className="left-page-posting">
                        <div className="posting-add-btn">
                            {
                                this.props.user &&
                                <Link to={`/postingAdd`}>
                                    <IconButton>
                                        <img height="40px" src="/images/posting-add-btn.png" alt="addposting"/>
                                    </IconButton>
                                </Link>
                            }
                            
                        </div>
                        <div className="posting-view">
                            {
                                !tag ?
                                posting.map((data, i) => {
                                    return <PostingView key={i} postingdata={data} />
                                })
                                :
                                tag.map((data, i) => {
                                    return <PostingView key={i} postingdata={data} />
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="right-page">
                    <div className="right-search-bar">
                        <form className="search-bar">
                            <input type="text" placeholder="Search..." aria-label="Search" />
                            <IconButton>
                                <img src="/images/search-icon.png" alt="searchicon"/>
                            </IconButton>
                        </form>
                    </div>
                    <div className="tag-selection">
                        <p>원하는 태그 선택</p>
                        <div className="tag-selection-box">
                            <form>
                                <ul>
                                    <div className="line4"></div>
                                    <li onClick={async () => { const item = await axios.post('http://localhost:5000/posting/top-tag-all'); this.setState({ tag: item.data }); }}><Button style={{fontSize:'18px',fontWeight:'bold'}}>상의</Button></li>
                                    <li onClick={async () => { const item = await axios.post('http://localhost:5000/posting/top-tag?tag=short-tee'); this.setState({ tag: item.data }); }}><Button>반팔</Button></li>
                                    <li onClick={async () => { const item = await axios.post('http://localhost:5000/posting/top-tag?tag=shirt'); this.setState({ tag: item.data }); }}><Button>셔츠</Button></li>
                                    <li onClick={async () => { const item = await axios.post('http://localhost:5000/posting/top-tag?tag=hood-shirt'); this.setState({ tag: item.data }); }}><Button>후드티</Button></li>
                                    <li onClick={async () => { const item = await axios.post('http://localhost:5000/posting/top-tag?tag=sweatshirt'); this.setState({ tag: item.data }); }}><Button>스웨트</Button></li>
                                    <li onClick={async () => { const item = await axios.post('http://localhost:5000/posting/top-tag?tag=top-etc'); this.setState({ tag: item.data }); }}><Button>기타</Button></li>
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
                                    <li><Button style={{fontSize:'18px',fontWeight:'bold'}}>신발</Button></li>
                                    <li><Button>운동화</Button></li>
                                    <li><Button>구두</Button></li>
                                    <li><Button>스니커즈</Button></li>
                                    <li><Button>샌들</Button></li>
                                    <li><Button>기타</Button></li>
                                </ul>
                            </form>
                        </div>
                    </div>
                    <div className="hot-posting">
                        <p>인기 포스터</p>
                        <div className="hot-posting-box">
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'긴머리와 파마머리 ' + new Date().getFullYear() + ' 졸업작품 프로젝트'}
                    </Typography>
                </footer>
            </div>
        );
     };
 }
 export default Home;

            