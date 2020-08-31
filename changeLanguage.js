/** 
 * Input 태그에 한국어 입력 시 영문으로 변환 
 * 단점: inputRef로 최대 문자수 지정했음에도 초과하는 문제 발생
 * */

import React from 'react';

// Module
import TextField from '@material-ui/core/TextField';

function Login(props) {
    // shift key true & false
    let shiftState;

    const shiftKeyDown = (e) => {
        shiftState = e.shiftKey;
    }

    const onChangeEmailId = (e) => {
        setEmailId(e.target.value);
        changeKorean(e);

        const idLength = e.target.value.length;
        if (idLength >= 30) {
            // 제한 걸렸을 경우 코드
            setEmailIdErr(true);
        } else {
            setEmailIdErr(false);
        }
    };

    const changeKorean = (e) => {
        const korean = ['ㅂ', 'ㅃ', 'ㅈ', 'ㅉ', 'ㄷ', 'ㄸ', 'ㄱ', 'ㄲ', 'ㅅ', 'ㅆ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'];

        let regExpKorean = [];
        for (let i = 0; i < korean.length; i++) {
            regExpKorean.push(new RegExp(`^(\\w+${korean[i]})|(${korean[i]}\\w+)|(${korean[i]})$`));
        }
        
        const english = ['q', 'Q', 'w', 'W', 'e', 'E', 'r', 'R', 't', 'T', 'y', 'u', 'i', 'o', 'O', 'p', 'P', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
        const capitalLetter = ['Q', 'Q', 'W', 'W', 'E', 'E', 'R', 'R', 'T', 'T', 'Y', 'U', 'I', 'O', 'O', 'P', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
        
        for (let i = 0; i < regExpKorean.length; i++) {

            if (regExpKorean[i].test(e.target.value)) {
                const string = e.target.value.replace(korean[i], english[i]);
                console.log(korean[i], '정규식 변환 ->', string);
                setEmailId(string);
            }

            if (regExpKorean[i].test(e.target.value) && shiftState) {
                const string = e.target.value.replace(korean[i], capitalLetter[i]);
                console.log(korean[i], '정규식 변환 ->', string);
                setEmailId(string);
            }
        }
    }

    return (
        <>
            <div className="login-id">
                {
                    <TextField id="outlined-basic-1" onKeyDown={shiftKeyDown} label="이메일 아이디" placeholder="id@domain.com" inputRef={emailLength} variant="outlined" value={emailId} onChange={onChangeEmailId} fullWidth={true} />
                }
            </div>
            <div className="login-pwd">
                {
                    <TextField id="outlined-basic-2" type="password" label="비밀번호" inputRef={passwordLength} variant="outlined" value={password} onChange={onChangePassword} fullWidth={true} />
                }
            </div>
        </>
    );
}

export default Login;