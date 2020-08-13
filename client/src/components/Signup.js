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

function Signup(props) {
    const [emailId, setEmailId] = useState('');
    const [password,setPassword] = useState('');
    const [nick,setNick] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [term,setTerm] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [termError,setTermError] = useState(false);
    const [termPage, setTermPage] = useState(false);

    const [emailIdErr, setEmailIdErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [passwordCheckErr, setPassWordCheckErr] = useState(false);
    const [nickErr, setNickErr] = useState(false);

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

    // // 중복된 emailId, nickname, password 코드 최소화
    // const useInput = (initValue = null) => {
    //     const [value,setter] = useState(initValue);
    //     const handler = useCallback((e) => {
    //         setter(e.target.value);
    //     }, []);
    //     console.log(initValue);
    //     return [value, handler];
    // };

    const onChangeEmailId = (e) => {
        setEmailId(e.target.value);

        const idLength = e.target.value.length;
        if (idLength >= 30) {
            // 제한 걸렸을 경우 코드
            setEmailIdErr(true);
        } else {
            setEmailIdErr(false);
        }
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);

        const passwordLength = e.target.value.length;
        if (passwordLength >= 20) {
            // 제한 걸렸을 경우 코드
            setPasswordErr(true);
        } else {
            setPasswordErr(false);
        }
    };

    const onChangeNick = (e) => {
        setNick(e.target.value);

        const nickLength = e.target.value.length;
        if (nickLength >= 10) {
            // 제한 걸렸을 경우 코드
            setNickErr(true);
        } else {
            setNickErr(false);
        }
    };

    // const [emailId,onChangeEmailId] = useInput('');
    // const [nick,onChangeNick] = useInput('');
    // const [password,onChangePassword] = useInput('');

    const onSubmit = useCallback( async (e) => {
        e.preventDefault();
        /** 검증 로직
         * 1. 아이디 유효성 검사
         * 2. 닉네임 유효성 검사
         * 3. 비밀번호 유효성 검사
         * 4. 비밀번호와 비밀번호 체크가 다를 경우를 검증한다
         * 5. 약관 동의를 확인한다.
         */
        // if (id === '') alert('아이디를 입력해주세요.');

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
            const infoObj = {
                emailId: emailId,
                password: password,
                nick: nick
            };

            await axios.post('http://localhost:5000/users/insert', {info: infoObj});

            console.log({
                emailId,
                nick,
                password,
                passwordCheck,
                term
            });
        }
        
    }, [password, passwordCheck, term, termPage, emailId, nick]);

    const onChangePasswordChk = useCallback((e) => {
        // 비밀번호를 입력할때마다 password 를 검증하는 함수
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);

        const passwordCheckLength = e.target.value.length;
        if (passwordCheckLength >= 20) {
            // 제한 걸렸을 경우 코드
            setPassWordCheckErr(true);
        } else {
            setPassWordCheckErr(false);
        }

        console.log(passwordCheckLength)
    }, [password]);

    const onChangeTerm = useCallback((e) => {
        // 체크박스 초기화
        setTermError(false);
        setTerm(e.target.checked);
    }, []);

    // 약관 동의 체크박스 UI
    const neonStyles = useNeonCheckboxStyles();

    return (
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
                            !emailIdErr ?
                            <TextField id="standard-basic-1" inputRef={emailLength} label="이메일 아이디" value={emailId} placeholder="id@domain.com" required onChange={onChangeEmailId} />
                            :
                            <>
                            <TextField error id="outlined-error-helper-text" label="이메일 아이디" placeholder="id@domain.com" inputRef={emailLength} value={emailId} required onChange={onChangeEmailId} />
                            <div style={{color: 'red', margin: '5px auto'}}>이메일은 8~30자 사이로 입력해주세요.</div>
                            </>
                        }
                    </div>
                    <div className="signup-nick">
                        {
                            !nickErr ?
                            <TextField id="standard-basic-2" inputRef={nickLength} label="닉네임" value={nick} placeholder="2 ~ 10자 사이" required onChange={onChangeNick} />
                            :
                            <>
                            <TextField error id="standard-basic-2" inputRef={nickLength} label="닉네임" value={nick} placeholder="2 ~ 10자 사이" required onChange={onChangeNick} />
                            <div style={{color: 'red', margin: '5px auto'}}>닉네임은 2~8자 사이로 입력해주세요.</div>
                            </>
                        }
                    </div>
                    <div className="signup-pwd">
                        {
                            !passwordErr ?
                            <TextField id="standard-basic-3" inputRef={passwordLength} type="password" label="비밀번호" value={password} placeholder="6 ~ 20자 사이" required onChange={onChangePassword} />
                            :
                            <>
                            <TextField error id="outlined-error-helper-text" type="password" label="비밀번호" inputRef={passwordLength} value={password} required onChange={onChangePassword} />
                            <div style={{color: 'red', margin: '5px auto'}}>패스워드는 6~20자 사이로 입력해주세요.</div>
                            </>
                        }
                    </div>
                    <div className="signup-pwdcheck">
                        {
                            !passwordCheckErr ?
                            <TextField id="standard-basic-4" inputRef={passwordCheckLength} type="password" label="비밀번호 확인" value={passwordCheck} placeholder="6 ~ 20자 사이" required onChange={onChangePasswordChk} />
                            :
                            <>
                            <TextField error id="outlined-error-helper-text" type="password" label="비밀번호 확인" inputRef={passwordCheckLength} value={passwordCheck} required onChange={onChangePasswordChk} />
                            <div style={{color: 'red', margin: '5px auto'}}>패스워드는 6~20자 사이로 입력해주세요.</div>
                            </>
                        }
                        {passwordError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
                    </div>

                    <div className="signup-btn">
                        <Button type="submit" variant="outlined">가입</Button>
                        <Button onClick={props.signup} variant="outlined" color="primary">취소</Button>
                    </div>
                </form>
            }
        </div>
    );
}

export default Signup;
