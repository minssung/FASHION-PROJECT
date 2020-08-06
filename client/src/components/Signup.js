import React, { useState, useCallback } from 'react';
import './CSS/Signup.css';
import TermComment from './TermComment';

// Module
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useNeonCheckboxStyles } from '@mui-treasury/styles/checkbox/neon';

function Signup(props) {
    const [passwordCheck,setPasswordCheck] = useState('');
    const [term,setTerm] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [termError,setTermError] = useState(false);
    const [termPage, setTermPage] = useState(false);

    // 중복된 emailId, nickname, password 코드 최소화
    const useInput = (initValue = null) => {
        const [value,setter] = useState(initValue);
        const handler = useCallback((e) => {
            setter(e.target.value);
        }, []);
        return [value,handler];
    };

    const [emailId,onChangeEmailId] = useInput('');
    const [nick,onChangeNick] = useInput('');
    const [password,onChangePassword] = useInput('');

    const onSubmit = useCallback((e) => {
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
                        <TextField id="standard-basic-1" label="이메일 아이디" value={emailId} required onChange={onChangeEmailId} />
                    </div>
                    <div className="signup-nick">
                        <TextField id="standard-basic-2" label="닉네임" value={nick} required onChange={onChangeNick} />
                    </div>
                    <div className="signup-pwd">
                        <TextField id="standard-basic-3" type="password" label="비밀번호" value={password} required onChange={onChangePassword} />
                    </div>
                    <div className="signup-pwdcheck">
                        <TextField id="standard-basic-4" type="password" label="비밀번호 확인" value={passwordCheck} required onChange={onChangePasswordChk} />
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
