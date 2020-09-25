import React, { useState, useCallback, useRef, useEffect } from 'react';
import './CSS/Signup.css';
import TermComment from './TermComment';

// Module
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useNeonCheckboxStyles } from '@mui-treasury/styles/checkbox/neon';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup(props) {
    const [emailId, setEmailId] = useState('');
    const [password,setPassword] = useState('');
    const [nick,setNick] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [term,setTerm] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [termError,setTermError] = useState(false);
    const [termPage, setTermPage] = useState(false);
    const [insertModal, setInsertModal] = useState(false);

    // 최대 글자 수 초과 에러 상태값
    const [emailIdErr, setEmailIdErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [passwordCheckErr, setPasswordCheckErr] = useState(false);
    const [nickErr, setNickErr] = useState(false);

    // 회원가입 이메일 유효성 상태값
    const [confirmEmailId, setConfirmEmailId] = useState(false);
    const [confirmIdErr, setConfirmIdErr] = useState(false);
    const [existId, setExistId] = useState(false);

    // 회원가입 닉네임 유효성 상태값
    const [confirmNick, setConfirmNick] = useState(false);
    const [confirmNickErr, setConfirmNickErr] = useState(false);
    const [existNick, setExistNick] = useState(false);
    const [exceptionNick, setExceptionNick] = useState(false);

    // 회원가입 비밀번호 유효성 상태값
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [confirmPasswordCheck, setConfirmPasswordCheck] = useState(false);

    // 최대 글자 수 지정을 위한 useRef
    const emailLength = useRef();
    const passwordLength = useRef();
    const passwordCheckLength = useRef();
    const nickLength = useRef();

    useEffect(() => {
        if (termPage) {
            emailLength.current.maxLength = 30;
            passwordLength.current.maxLength = 20;
            passwordCheckLength.current.maxLength = 20;
            nickLength.current.maxLength = 10;
        }
        
    }, [termPage]);

    const onChangeEmailId = (e) => {
        setEmailId(e.target.value);

        const idLength = e.target.value.length;
        if (idLength >= 30) {
            setEmailIdErr(true);
        } else {
            setEmailIdErr(false);
        }
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        const regExp = /\s/g;
        let password = e.target.value;
        password = password.replace(regExp, '');
        setPassword(password);

        limitPassword(e);
    };

    // 비밀번호를 입력할때마다 password 를 검증하는 함수
    const onChangePasswordChk = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);

        const regExp = /\s/g;
        let regPwd = e.target.value;
        regPwd = regPwd.replace(regExp, '');
        setPasswordCheck(regPwd);

        limitPassword(e);
    }, [password]);

    const limitPassword = (e) => {
        const passwordLength = e.target.value.length;

        if (passwordLength >= 20 && e.target.name === "password") {
            setPasswordErr(true);
        } else {
            setPasswordErr(false);
        }
        
        if (passwordLength >= 20 && e.target.name === "passwordChk") {
            setPasswordCheckErr(true);
        } else {
            setPasswordCheckErr(false);
        }
    }

    // 회원가입 닉네임 입력 (특수문자 입력불가)
    const onChangeNick = (e) => {
        setNick(e.target.value);
        const regExp = /[\\{\\}\\[\]\\/?.,;:|\\)*~`!^\-_+<>@\\#$%&₩\\\\=\\(\\'\\"\s]/g;
        const nick = e.target.value;
        const nickErr = nick.replace(regExp, '');
        setNick(nickErr);
        if (regExp.test(nick)) alert('특수문자는 사용할 수 없습니다.');

        const nickLength = e.target.value.length;
        if (nickLength >= 10) {
            setNickErr(true);
        } else {
            setNickErr(false);
        }
    };

    // 체크박스 초기화
    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, []);

    const onSubmit = useCallback( async (e) => {
        e.preventDefault();

        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        if (!termPage) {
            setTermPage(true);
        } 
        // 회원 정보 DB users 컬렉션에 저장
        else {
            // 회원 이메일, 닉네임, 비밀번호가 모두 유효할 경우
            if (confirmEmailId && confirmNick && !confirmPassword && !confirmPasswordCheck) {
                const infoObj = {
                    emailId: emailId,
                    password: password,
                    nick: nick
                };
    
                await axios.post('http://localhost:5000/users/insert', {info: infoObj});

                // 모달 on
                setInsertModal(true);

            } else {
                // 로그인 실패
                if (!emailId) setEmailIdErr(true);
                if (!nick) setNickErr(true);
                if (!password) setPasswordErr(true);
                if (!passwordCheck) setPasswordCheckErr(true);
            }   
        }
    }, [password, passwordCheck, term, termPage, emailId, nick, confirmEmailId, confirmNick, confirmPassword, confirmPasswordCheck]);

    // 이메일 중복검사
    const onBlurEmailId = async (e) => {
        const regExp = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const id = e.target.value;

        if (id) {
            const result = await axios.post('http://localhost:5000/users/emailIdCheck', { id: id });

            // 사용가능 - 사용불가(중복) - 기본
            if (regExp.test(id) === true && !result.data) {
                setConfirmEmailId(true);
                setConfirmIdErr(false);
                setExistId(false);
            } else if (regExp.test(id) === true && result.data) {
                setConfirmEmailId(false);
                setConfirmIdErr(false);
                setExistId(true);
            } else {
                setConfirmEmailId(false);
                setConfirmIdErr(true);
                setExistId(false);
            }
        }
    };

    // 닉네임 중복검사
    const onBlurNick = async (e) => {
        const regExp = /^.{2,10}$/i;
        const regExp2 = /([ㄱ-ㅎㅏ-ㅣ])/i;
        const nick = e.target.value;

        if (nick) {
            const result = await axios.post('http://localhost:5000/users/nickCheck', { nick: nick });

            // 사용가능 - 사용불가(중복) - 기본
            if (regExp.test(nick) === true && !result.data) {
                setConfirmNick(true);
                setConfirmNickErr(false);
                setExceptionNick(false);
                setExistNick(false);
            } else if (regExp.test(nick) === true && result.data) {
                setConfirmNick(false);
                setConfirmNickErr(false);
                setExceptionNick(false);
                setExistNick(true);
            } else {
                setConfirmNick(false);
                setConfirmNickErr(true);
                setExceptionNick(false);
                setExistNick(false);
            }
            // 자응, 모음 예외처리
            if (regExp2.test(nick) === true) {
                setConfirmNick(false);
                setConfirmNickErr(false);
                setExceptionNick(true);
                setExistNick(false);
            }
        }
    };

    // 비밀번호 유효성 검사
    const onBlurPassword = (e) => {
        const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/i;
        const password = e.target.value;

        if (password) {
            if (regExp.test(password)) {
                setConfirmPassword(false);
            } else {
                setConfirmPassword(true);
            }
        }
    }
    const onBlurPasswordCheck = (e) => {
        const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/i;
        const password = e.target.value;

        if (password) {
            if (regExp.test(password)) {
                setConfirmPasswordCheck(false);
            } else {
                setConfirmPasswordCheck(true);
            }
        }
    }

    // 약관 동의 체크박스 UI
    const neonStyles = useNeonCheckboxStyles();

    return (
        <>
            <div className="signup-container">
                {
                    !termPage ?
                    <div className="signup-term-container">
                        <div>이용약관</div>
                        <div className="signup-term-comment">
                            {<TermComment/>}
                        </div>
                        <form onSubmit={onSubmit} className="signup-term-form" noValidate autoComplete="off">
                            <div className="signup-term">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disableRipple
                                            classes={neonStyles}
                                            checkedIcon={<span />}
                                            icon={<span />}
                                            value={term} onChange={onChangeTerm}
                                        />
                                    }
                                    label={'약관에 동의'}
                                />
                                {termError && <div style={{color : 'red'}}>약관에 동의하셔야 합니다.</div>}
                            </div>
                            <div className="signup-term-btn">
                                <Button type="submit" variant="outlined" fullWidth={true}>가입</Button>
                            </div>
                        </form>
                    </div>
                    :
                    <form onSubmit={onSubmit} className="signup-input-form" noValidate autoComplete="off">
                        <div className="signup-id">
                            {
                                !emailIdErr ? <>
                                <TextField id="standard-basic-1" inputRef={emailLength} onBlur={onBlurEmailId} label="이메일 아이디" value={emailId} placeholder="id@domain.com" required onChange={onChangeEmailId} />
                                { confirmEmailId && <div className="signup-input-confirm-1">사용 가능한 이메일입니다.</div> }
                                { confirmIdErr && <div className="signup-input-confirm-2">이메일 형식으로 입력해주세요.</div> }
                                { existId && <div className="signup-input-confirm-3">이미 등록된 이메일입니다.</div> }
                                </>
                                :
                                <>
                                <TextField error id="outlined-error-helper-text" label="이메일 아이디" placeholder="id@domain.com" inputRef={emailLength} value={emailId} required onChange={onChangeEmailId} />
                                <div className="signup-input-error">이메일은 8~30자 사이로 입력해주세요.</div>
                                </>
                            }
                        </div>
                        <div className="signup-nick">
                            {
                                !nickErr ? <>
                                <TextField id="standard-basic-2" inputRef={nickLength} onBlur={onBlurNick} label="닉네임" value={nick} placeholder="2 ~ 10자 사이" required onChange={onChangeNick} />
                                { confirmNick && <div className="signup-input-confirm-1">사용 가능한 닉네임입니다.</div> }
                                { confirmNickErr && <div className="signup-input-confirm-2">2 ~ 10자로 입력해주세요.</div> }
                                { exceptionNick && <div className="signup-input-confirm-2">자음, 모음을 단일로 사용할 수 없습니다.</div> }
                                { existNick && <div className="signup-input-confirm-3">이미 등록된 닉네임입니다.</div> }
                                </>
                                :
                                <>
                                <TextField error id="standard-basic-2" inputRef={nickLength} label="닉네임" value={nick} placeholder="2 ~ 10자 사이" required onChange={onChangeNick} />
                                <div className="signup-input-error">닉네임은 2~8자 사이로 입력해주세요.</div>
                                </>
                            }
                        </div>
                        <div className="signup-pwd">
                            {
                                !passwordErr ? <>
                                <TextField id="standard-basic-3" name="password" inputRef={passwordLength} onBlur={onBlurPassword} type="password" label="비밀번호" value={password} placeholder="영문, 숫자 6 ~ 20자 사이" required onChange={onChangePassword} />
                                { confirmPassword && <div className="signup-input-confirm-2">영문과 숫자를 포함한 6~20자여야 합니다.</div> }
                                </>
                                :
                                <>
                                <TextField error id="outlined-error-helper-text" type="password" label="비밀번호" inputRef={passwordLength} value={password} required onChange={onChangePassword} />
                                <div className="signup-input-error">패스워드는 6~20자 사이로 입력해주세요.</div>
                                </>
                            }
                        </div>
                        <div className="signup-pwdcheck">
                            {
                                !passwordCheckErr ? <>
                                <TextField id="standard-basic-4" name="passwordChk" inputRef={passwordCheckLength} onBlur={onBlurPasswordCheck} type="password" label="비밀번호 확인" value={passwordCheck} placeholder="영문, 숫자 6 ~ 20자 사이" required onChange={onChangePasswordChk} />
                                { confirmPasswordCheck && <div className="signup-input-confirm-2">영문과 숫자를 포함한 6~20자여야 합니다.</div> }
                                </>
                                :
                                <>
                                <TextField error id="outlined-error-helper-text" type="password" label="비밀번호 확인" inputRef={passwordCheckLength} value={passwordCheck} required onChange={onChangePasswordChk} />
                                <div className="signup-input-error">패스워드는 6~20자 사이로 입력해주세요.</div>
                                </>
                            }
                            {passwordError && <div className="signup-input-password-error">비밀번호가 일치하지 않습니다.</div>}
                        </div>

                        <div className="signup-btn">
                            <Button type="submit" variant="outlined">가입</Button>
                            <Link to="/" style={{textDecoration: 'none'}}>
                                <Button variant="outlined" color="primary">취소</Button>
                            </Link>
                        </div>
                        
                    </form>
                }
            </div>  
            {
                insertModal && <>
                    <div className="signup-modal-overlay"></div>
                    <div className="signup-modal">
                        <div className="signup-modal-comment">
                            회원가입이 완료되었습니다.
                        </div>
                        <div className="signup-modal-btn">
                            <Link to="/" style={{textDecoration: 'none'}}>
                                <Button variant="outlined" color="primary">로그인</Button>
                            </Link>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Signup;