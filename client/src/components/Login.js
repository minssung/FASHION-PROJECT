import React, { useState } from 'react';
import './CSS/Login.css';

// Module
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Input Component CSS
const useStyles = makeStyles((theme) => ({
    input: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    button: {
        '& > *': {
          margin: theme.spacing(1),
          display: 'flex',
          
        },
    },
  }));

function Login() {
    const [id, setId] = useState();
    const [pwd, setPwd] = useState();

    const classes = useStyles();

    return (
        <div className="login-container">
            <form className="login-input-form" noValidate autoComplete="off">
                <div className="login-id">
                    <TextField id="outlined-basic" label="아이디" variant="outlined" value={id} />
                </div>
                <div className="login-pwd">
                    <TextField id="outlined-basic" type="password" label="비밀번호" variant="outlined" value={pwd} />
                </div>
            </form>
            <div className="login-signup-form">
                <Button variant="outlined">로그인</Button>
                <Button variant="outlined" color="primary">회원가입</Button>
            </div>
        </div>
      );
}

export default Login;