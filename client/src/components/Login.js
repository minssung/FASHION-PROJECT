import React, { useState, useRef, useEffect } from 'react';
import './CSS/Login.css';

// Module
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Login(props) {
    const [emailId, setEmailId] = useState('');
    const [password,setPassword] = useState('');
    const [emailIdErr, setEmailIdErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const emailLength = useRef();
    const passwordLength = useRef();

    // < 아이디, 비밀번호 길이 제한 >
    // 초기에 한 번 실행
    // 아이디는 8자 ~ 30자 이메일 형식으로만
    // 비밀번호는 6자 ~ 20자 영어, 숫자 각각 최소 3자 씩
    useEffect(() => {
        emailLength.current.maxLength = 30;
        passwordLength.current.maxLength = 20;

    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        // 아이디와 비밀번호 검증 로직
    };

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

    return (
        <div className="login-container">
            <form onSubmit={onSubmit} className="login-input-form" noValidate autoComplete="off">
                <div className="login-id">
                    {
                        !emailIdErr ?
                        <TextField id="outlined-basic-1" label="이메일 아이디" placeholder="id@domain.com" inputRef={emailLength} variant="outlined" value={emailId} onChange={onChangeEmailId} fullWidth={true} />
                        :
                        <>
                        <TextField error id="outlined-error-helper-text" label="이메일 아이디" placeholder="id@domain.com" inputRef={emailLength} variant="outlined" value={emailId} onChange={onChangeEmailId} fullWidth={true} />
                        <div style={{color: 'red', margin: '5px auto'}}>이메일은 8~30자 사이로 입력해주세요.</div>
                        </>
                    }
                </div>
                <div className="login-pwd">
                    {
                        !passwordErr ?
                        <TextField id="outlined-basic-2" type="password" label="비밀번호" inputRef={passwordLength} variant="outlined" value={password} onChange={onChangePassword} fullWidth={true} />
                        :
                        <>
                        <TextField error id="outlined-error-helper-text" type="password" label="비밀번호" inputRef={passwordLength} variant="outlined" value={password} onChange={onChangePassword} fullWidth={true} />
                        <div style={{color: 'red', margin: '5px auto'}}>패스워드는 6~20자 사이로 입력해주세요.</div>
                        </>
                    }
                </div>
                <div className="login-signup-btn">
                    <Button type="submit" variant="outlined">로그인</Button>
                    <Button onClick={props.signup} variant="outlined" color="primary">회원가입</Button>
                </div>
            </form>
        </div>
      );
}

export default Login;