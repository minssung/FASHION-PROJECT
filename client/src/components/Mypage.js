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
            verify: false,          // mypage 유저와 현재 로그인 한 유저가 동일한지 여부
            setUserModal: false,    // 회원정보 변경

            /** 닉네임 */
            nick: '',
            nickErr: false,
            confirmNick: false,
            confirmNickErr: false,
            existNick: false,
            exceptionNick: false,

            /** 코멘트 */
            comment: '',
            commentErr: false,

            /** 프로필 사진  */
            img: null,
            file: '',
            previewURL: '', // FileReader 객체에 담긴 프로필 프리뷰
            previewImg: '', // 프로필 사진 변경때 프리뷰
            pageImg: '',    // 마이 페이지 프로필 사진
        }
        this.user = this.props.user;          // 로그인 유저 데이터
        this.pageUser = this.props.pageUser;  // 해당 페이지 유저

        this.nickLength = React.createRef();
        this.commentLength = React.createRef();
    }

    async componentDidMount() {
        if (this.user.emailId === this.pageUser.emailId) this.setState({ verify: true });
        
        this.setState({ 
            previewImg: this.pageUser.photo, 
            pageImg: this.pageUser.photo 
        });
    }

    componentDidUpdate() {
        if (this.state.setUserModal) {
            this.nickLength.current.maxLength = 10;
            this.commentLength.current.maxLength = 10;
        }
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

    onChangeComment(e) {
        this.setState({ comment: e.target.value });
        
        const commentLength = e.target.value.length;
        if (commentLength >= 10) {
            this.setState({ commentErr: true });
        } else {
            this.setState({ commentErr: false });
        }
    }

    onSubmitNick(e) {
        e.preventDefault();

        if (this.state.confirmNick) {
            console.log('aa')
            // 닉네임 변경 성공

        } else {
            // 닉네임 변경 실패
            if (!this.state.nick) this.setState({ nickErr: true });
        }
    }

    onSubmitComment(e) {
        e.preventDefault();

        if (!this.state.commentErr) {
            // 코멘트 변경 성공
            console.log('변경 성공');

        }
    }

    async onChangePhoto(e) {
        this.setState({ previewImg: '' });
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
        this.setState({
            file : file,
            previewURL : reader.result
        })
        }
        reader.readAsDataURL(file);

        await this.setState({ img: e.target.files[0] });
    }

    async onClickPhoto() {
        const formData = new FormData();
        formData.append('img', this.state.img);

        const result = await axios.post(`http://localhost:5000/upload?emailId=${this.user.emailId}&photo=${this.state.pageImg}`, formData);
        this.setState({ 
            pageImg: result.data.url,
            previewImg: result.data.url
        });
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
            // 자음, 모음 예외처리
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
        const { verify, setUserModal, file, previewURL, previewImg, pageImg } = this.state;
        const { nick, nickErr, confirmNick, confirmNickErr, existNick, exceptionNick, comment, commentErr } = this.state;

        let profile_preview = null;
        if (file !== '') {
            profile_preview = previewURL;
        }

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
                        {
                            pageImg ?
                            <img className="user-profile-img" src={`http://localhost:5000/uploads/${pageImg}`} alt="user-profile"/>
                            :
                            <div className="user-profile-img"></div>
                        }
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
                                            comment: '',
                                            commentErr: false,
                                            img: null,
                                            file: '',
                                            previewURL: '',
                                        })
                                    }}>&times;</div>
                                    <div className="user-set-body">
                                        <div className="user-set-text1">닉네임</div>
                                        <form className="user-set-form" onSubmit={this.onSubmitNick.bind(this)} noValidate autoComplete="off">
                                            <div className="user-set">
                                                {
                                                    !nickErr ? <>
                                                    <TextField id="standard-basic-2" inputRef={this.nickLength} onBlur={this.onBlurNick.bind(this)} label="닉네임" value={nick} placeholder="2 ~ 10자 사이" onChange={this.onChangeNick.bind(this)} />
                                                    
                                                    { confirmNick && <div className="signup-input-confirm-1">사용 가능한 닉네임입니다.</div> }
                                                    { confirmNickErr && <div className="signup-input-confirm-2">2 ~ 10자로 입력해주세요.</div> }
                                                    { exceptionNick && <div className="signup-input-confirm-2">자음, 모음을 단일로 사용할 수 없습니다.</div> }
                                                    { existNick && <div className="signup-input-confirm-3">이미 등록된 닉네임입니다.</div> }
                                                    </>
                                                    :
                                                    <>
                                                    <TextField error id="standard-basic-2" inputRef={this.nickLength} label="닉네임" value={nick} placeholder="2 ~ 10자 사이" onChange={this.onChangeNick.bind(this)} />
                                                    <div className="signup-input-error">닉네임은 2~10자 사이로 입력해주세요.</div>
                                                    </>
                                                }
                                            </div>
                                            <Button className="user-set-btn" type="submit" variant="outlined">변경</Button>
                                        </form>

                                        <div className="user-set-text2">코멘트</div>
                                        <form className="user-set-form" onSubmit={this.onSubmitComment.bind(this)} noValidate autoComplete="off">
                                            <div className="user-set">
                                                {
                                                    !commentErr ?
                                                    <TextField id="standard-basic-3" inputRef={this.commentLength} label="코멘트" value={comment} placeholder="최대 15자" onChange={this.onChangeComment.bind(this)} />
                                                    :
                                                    <>
                                                    <TextField error id="standard-basic-3" inputRef={this.commentLength} label="코멘트" value={comment} placeholder="최대 15자" onChange={this.onChangeComment.bind(this)} />
                                                    <div className="signup-input-error">코멘트는 10자 미만으로 입력해주세요.</div>
                                                    </>
                                                }
                                                
                                            </div>
                                            <Button className="user-set-btn" type="submit" variant="outlined">변경</Button>
                                        </form>

                                        <div className="user-set-text3">프로필 사진</div>
                                        <div className="user-set-form-photo">
                                            <div className="user-set-photo">
                                                {
                                                    previewImg ?
                                                    <img src={`http://localhost:5000/uploads/${pageImg}`} alt="user-profile" />
                                                    :
                                                    profile_preview ?
                                                    <img src={profile_preview} alt="user-profile" />
                                                    :
                                                    <div className="user-set-non-photo"></div>
                                                }
                                            </div>
                                            <div className="user-set-body-photo">
                                                <input type="file" name="img" onChange={this.onChangePhoto.bind(this)} accept='image/jpg,impge/png,image/jpeg,image/gif'  />
                                                <Button className="user-set-btn" onClick={this.onClickPhoto.bind(this)} variant="outlined">변경</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                        <div className="user-name">{this.pageUser.nick}</div>

                        {
                            this.pageUser.comment ?
                            <div className="user-comment">{this.pageUser.comment}</div>
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
                                        this.pageUser.follower ?
                                        <td>{this.pageUser.follower.length}</td>
                                        :
                                        <td>0</td>
                                    }
                                    {
                                        this.pageUser.follow ?
                                        <td>{this.pageUser.follow.length}</td>
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