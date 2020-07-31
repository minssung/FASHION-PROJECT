import React, { useState } from 'react';
import './CSS/Login.css';

// Module
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Input Component CSS
// const useStyles = makeStyles((theme) => ({
//     input: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },
//     button: {
//         '& > *': {
//           margin: theme.spacing(1),
//           display: 'flex',
          
//         },
//     },
//   }));

function Login(props) {
    const [id, setId] = useState('');
    const [password,setPassword] = useState('');

    // const classes = useStyles();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(id, password)
    };
    const onChangeId = (e) => {
        setId(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="login-container">
            <form onSubmit={onSubmit} className="login-input-form" noValidate autoComplete="off">
                <div className="login-id">
                    <TextField id="outlined-basic-1" label="아이디" variant="outlined" value={id} required onChange={onChangeId} />
                </div>
                <div className="login-pwd">
                    <TextField id="outlined-basic-2" type="password" label="비밀번호" variant="outlined" value={password} required onChange={onChangePassword} />
                </div>
                <div className="login-signup-form">
                    <Button type="submit" variant="outlined">로그인</Button>
                    <Button onClick={props.signup} variant="outlined" color="primary">회원가입</Button>
                </div>
            </form>
            
        </div>
      );
}

export default Login;