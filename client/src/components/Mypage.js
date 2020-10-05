import React, { Component } from 'react';
import './CSS/Mypage.css';
import { IconButton, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Mypage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            verify: false,          // mypage 유저와 현재 로그인한 유저가 동일한지 여부
            setUserModal: false,    // 회원정보 변경

            /** 닉네임 변경 관련 state */
            nick: '',
            nickErr: false,
            confirmNick: false,
            confirmNickErr: false,
            existNick: false,
            exceptionNick: false,
        }

        this.nickLength = React.createRef();
    }

    async componentDidMount() {
        if (this.props.user.emailId === this.props.userData.emailId) this.setState({ verify: true });

        console.log(this.props.userData);
    }

    componentDidUpdate() {
        if (this.state.setUserModal) this.nickLength.current.maxLength = 10;
    }

    removeCookie() {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location = "/";
    }

    onChangeNick(e) {
        this.setState({ nick: e.target.value });
        const regExp = /[\\{\\}\\[\]\\/?.,;:|\\)*~`!^\-_+<>@\\#$%&₩\\\\=\\(\\'\\"\s]/g;
        const nick = e.target.value;
        const nickErr = nick.replace(regExp, '');
        this.setState({ nick: nickErr });

        if (regExp.test(nick)) alert('특수문자는 사용할 수 없습니다.');

        const nickLength = e.target.value.length;
        if (nickLength >= 10) {
            this.setState({ nickErr: true });
        } else {
            this.setState({ nickErr: false });
        }
    }

    onSubmitNick(e) {
        e.preventDefault();

        if (this.state.confirmNick) {
            console.log('aa')
            // 로그인 성공

        } else {
            // 로그인 실패
            if (!this.state.nick) this.setState({ nickErr: true });
        }
    }

    async onBlurNick(e) {
        const regExp = /^.{2,10}$/i;
        const regExp2 = /([ㄱ-ㅎㅏ-ㅣ])/i;
        const nick = e.target.value;

        if (nick) {
            const result = await axios.post('http://localhost:5000/users/nickCheck', { nick: nick });

            // 사용가능 - 사용불가(중복) - 기본
            if (regExp.test(nick) === true && !result.data) {
                this.setState({ 
                    confirmNick: true,
                    confirmNickErr: false,
                    exceptionNick: false,
                    existNick: false
                });
            } else if (regExp.test(nick) === true && result.data) {
                this.setState({ 
                    confirmNick: false,
                    confirmNickErr: false,
                    exceptionNick: false,
                    existNick: true
                });
            } else {
                this.setState({ 
                    confirmNick: false,
                    confirmNickErr: true,
                    exceptionNick: false,
                    existNick: false
                });
            }
            // 자응, 모음 예외처리
            if (regExp2.test(nick) === true) {
                this.setState({ 
                    confirmNick: false,
                    confirmNickErr: false,
                    exceptionNick: true,
                    existNick: false
                });
            }
        }
    };

    render(){
        const { verify, setUserModal } = this.state;
        const { nick, nickErr, confirmNick, confirmNickErr, existNick, exceptionNick } = this.state;
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
                            {
                                verify ?
                                <IconButton onClick={() => {this.setState({ setUserModal: true });}}>
                                    <img width="30px" src="/images/setting.PNG" alt="setting"/>
                                </IconButton>
                                :
                                <div style={{margin: '20px auto'}}></div>
                            }
                        </div>
                        {
                            setUserModal && <>
                                <div className="user-set-modal">
                                    <div className="user-set-title">회원정보 변경</div>
                                    <div className="user-set-modal-close" onClick={() => {
                                        // state 초기화
                                        this.setState({
                                            setUserModal: false,
                                            nick: '',
                                            nickErr: false,
                                            confirmNick: false,
                                            confirmNickErr: false,
                                            existNick: false,
                                            exceptionNick: false,
                                        })
                                    }}>&times;</div>
                                    <div className="user-set-body">
                                        <div className="user-set-text1">닉네임</div>
                                        <form className="user-set-form-nick" onSubmit={this.onSubmitNick.bind(this)} noValidate autoComplete="off">
                                            <div className="user-set-nick">
                                                {
                                                    !nickErr ? <>
                                                    <TextField id="standard-basic-2" inputRef={this.nickLength} onBlur={this.onBlurNick.bind(this)} label="닉네임" value={nick} placeholder="2 ~ 10자 사이" required onChange={this.onChangeNick.bind(this)} />
                                                    
                                                    { confirmNick && <div className="signup-input-confirm-1">사용 가능한 닉네임입니다.</div> }
                                                    { confirmNickErr && <div className="signup-input-confirm-2">2 ~ 10자로 입력해주세요.</div> }
                                                    { exceptionNick && <div className="signup-input-confirm-2">자음, 모음을 단일로 사용할 수 없습니다.</div> }
                                                    { existNick && <div className="signup-input-confirm-3">이미 등록된 닉네임입니다.</div> }
                                                    </>
                                                    :
                                                    <>
                                                    <TextField error id="standard-basic-2" inputRef={this.nickLength} label="닉네임" value={nick} placeholder="2 ~ 10자 사이" required onChange={this.onChangeNick.bind(this)} />
                                                    <div className="signup-input-error">닉네임은 2~10자 사이로 입력해주세요.</div>
                                                    </>
                                                }
                                            </div>
                                            <Button className="user-set-btn" type="submit" variant="outlined">변경</Button>
                                        </form>

                                        <div>코멘트</div>
                                        <div>프로필 사진</div>
                                    </div>
                                </div>
                            </>
                        }

                        <div className="user-name">{this.props.userData.nick}</div>

                        {
                            this.props.userData.comment ?
                            <div className="user-comment">{this.props.userData.comment}</div>
                            :
                            <div className="user-comment">빈 코멘트</div>
                        }
                        
                        <table className="user-history">
                            <thead>
                                <tr>
                                    <td>게시글</td>
                                    <td>팔로워</td>
                                    <td>팔로우</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>0</td>
                                    {
                                        this.props.userData.follower ?
                                        <td>{this.props.userData.follower.length}</td>
                                        :
                                        <td>0</td>
                                    }
                                    {
                                        this.props.userData.follow ?
                                        <td>{this.props.userData.follow.length}</td>
                                        :
                                        <td>0</td>
                                    }
                                </tr>
                            </tbody>
                        </table>
                        
                        {/* <div className="profile-edit">
                            <Button variant="outlined">프로필 편집</Button>
                        </div> */}

                        {
                            verify &&
                            <div className="mypage-logout">
                                <button onClick={() => this.removeCookie()}>로그아웃(임시)</button>
                            </div>
                        }
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