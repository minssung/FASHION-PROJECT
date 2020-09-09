import React, { useState, useRef, useEffect } from 'react';
import './CSS/Login.css';

// Module
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Login(props) {
    const [emailId, setEmailId] = useState('');
    const [password,setPassword] = useState('');
    const [emailIdErr, setEmailIdErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const [userCookie, setUserCookie] = useState('');
    const [cookies, setCookies] = useCookies(['name']);

    const emailRef = useRef();
    const passwordRef = useRef();

    // shift key true & false
    let onShift;

    // const fetchCookie = useCallback( async () => {
    //     const auth_JWT = await axios.get('http://localhost:5000/auth');
    //     console.log(auth_JWT);

    // }, [])

    // < 아이디, 비밀번호 길이 제한 >
    // 초기에 한 번 실행
    // 아이디는 8자 ~ 30자 이메일 형식으로만
    // 비밀번호는 6자 ~ 20자 영어, 숫자 각각 최소 3자 씩
    useEffect(() => {
        emailRef.current.maxLength = 30;
        passwordRef.current.maxLength = 20;

        async function fetchCookie() {
            // const result = axios.get('http://localhost:5000/verify');
            // console.log(result)

            // const token = await axios.get('http://localhost:5000/getToken');
            // console.log(token)

            setCookies('name', 'user', { path: '/' });
            console.log(cookies.name);

            // const result = await axios({
            //     method: 'post',
            //     url: 'http://localhost:5000/verify',
            //     headers: {
            //         'content-type' : 'text/json',
            //         'x-access-token': userCookie
            //     }
            // });
            // console.log(result);
        }
        fetchCookie()
        
    }, [cookies], [setCookies]);

    const onSubmit = async (e) => {
        e.preventDefault();
        // 아이디와 비밀번호 검증 로직
        
        const infoObj = {
            emailId: emailId,
            password: password
        };

        const checkInfo = await axios.post('http://localhost:5000/loginCheck', { info: infoObj }, { withCredentials: true });
        setUserCookie(checkInfo.data.user);
        console.log(checkInfo.data)

        // 로그인 성공, 실패
        if (!checkInfo.data.error) props.login();
        else if (checkInfo.data.error && emailId && password) alert('등록되지 않은 이메일이거나 일치하지 않는 비밀번호입니다.');
        else if (!emailId) { alert('이메일을 입력해주세요.'); emailRef.current.focus(); }
        else if (!password) { alert('비밀번호를 입력해주세요.'); passwordRef.current.focus(); }

    };

    const shiftKeyDown = (e) => {
        onShift = e.shiftKey;
    }

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
        changeKorean(e);

        const passwordLength = e.target.value.length;
        if (passwordLength >= 20) {
            // 제한 걸렸을 경우 코드
            setPasswordErr(true);
        } else {
            setPasswordErr(false);
        }
    };

    const changeKorean = (e) => {
        const korean = ['ㅂ', 'ㅃ', 'ㅈ', 'ㅉ', 'ㄷ', 'ㄸ', 'ㄱ', 'ㄲ', 'ㅅ', 'ㅆ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'];
        const english = ['q', 'Q', 'w', 'W', 'e', 'E', 'r', 'R', 't', 'T', 'y', 'u', 'i', 'o', 'O', 'p', 'P', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
        const capitalLetter = ['Q', 'Q', 'W', 'W', 'E', 'E', 'R', 'R', 'T', 'T', 'Y', 'U', 'I', 'O', 'O', 'P', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

        // 한국어만 return 되는 정규식 생성
        let regExpKorean = [];
        for (let i = 0; i < korean.length; i++) {
            regExpKorean.push(new RegExp(`^(\\w+${korean[i]})|(${korean[i]}\\w+)|(${korean[i]})$`));
        }
        
        for (let i = 0; i < regExpKorean.length; i++) {
            let string = e.target.value;

            if (regExpKorean[i].test(e.target.value)) {
                string = string.replace(korean[i], english[i]);
                setPassword(string);
            }

            if (regExpKorean[i].test(e.target.value) && onShift) {
                string = string.replace(korean[i], capitalLetter[i]);
                setPassword(string);
            }
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={onSubmit} className="login-input-form" noValidate autoComplete="off">
                <div className="login-id">
                    {
                        !emailIdErr ?
                        <TextField id="outlined-basic-1" label="이메일 아이디" placeholder="id@domain.com" inputRef={emailRef} variant="outlined" value={emailId} onChange={onChangeEmailId} fullWidth={true} />
                        :
                        <>
                        <TextField error id="outlined-error-helper-text" label="이메일 아이디" placeholder="id@domain.com" inputRef={emailRef} variant="outlined" value={emailId} onChange={onChangeEmailId} fullWidth={true} />
                        <div style={{color: 'red', margin: '5px auto'}}>이메일은 8~30자 사이로 입력해주세요.</div>
                        </>
                    }
                </div>
                <div className="login-pwd">
                    {
                        !passwordErr ?
                        <TextField id="outlined-basic-2" type="password" onKeyDown={shiftKeyDown} label="비밀번호" inputRef={passwordRef} variant="outlined" value={password} onChange={onChangePassword} fullWidth={true} />
                        :
                        <>
                        <TextField error id="outlined-error-helper-text" type="password" label="비밀번호" inputRef={passwordRef} variant="outlined" value={password} onChange={onChangePassword} fullWidth={true} />
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