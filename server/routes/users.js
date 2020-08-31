var express = require('express');
var router = express.Router();
const User = require('../models/users');
const crypto = require('crypto');

// env
const PASSWORD_SECRET_KEY = process.env.PASSWORD_SECRET_KEY;

// DB에서 해당 유저 찾아 유효성 검사
async function loginCheck(info) {
    const hashPwd = crypto.createHmac('sha256', PASSWORD_SECRET_KEY)
                    .update(info.password)
                    .digest('hex');

    const result = await User.findOne({emailId: info.emailid, password: hashPwd}, (error, solve) => {
        if (error) {
            console.log(error);
        } else if (solve) {
            const id = solve._id;
            return id;
        }
    });

    return result;
}

// 회원정보 이메일 중복 검사
async function emailIdCheck(id) {
    const result = await User.findOne({emailId: id}, (error, solve) => {
        if (error) {
            console.log(error);
        } else if (solve) {
            const id = solve._id;
            return id;
        }
    });

    return result;
}

// 회원정보 닉네임 중복 검사
async function nickCheck(nick) {
    const result = await User.findOne({nick: nick}, (error, solve) => {
        if (error) {
            console.log(error);
        } else if (solve) {
            const id = solve._id;
            return id;
        }
    });

    return result;
}

// 회원정보 이메일 중복 검사
async function passwordCheck(password) {
    const result = await User.findOne({password: password}, (error, solve) => {
        if (error) {
            console.log(error);
        } else if (solve) {
            const id = solve._id;
            return id;
        }
    });

    return result;
}

// 회원정보 입력받아 DB에 저장
function insert(info) {
    const hashPwd = crypto.createHmac('sha256', PASSWORD_SECRET_KEY)
                    .update(info.password)
                    .digest('hex');

    const newUser = new User({
        emailId: info.emailId,
        password: hashPwd,
        nick: info.nick,
    });

    newUser.save(function(error, data){
        if (error) {
            console.log(error);
        } else {
            console.log('회원정보 저장 완료');
        }
    });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// 로그인 유효 검사
router.post('/loginCheck', async (req, res) => {
    const result = await loginCheck(req.body.info);
    res.send(result);
});

// 회원정보 입력
router.post('/insert', (req, res) => {
    const result = insert(req.body.info);
    res.send(result);
});

// 이메일 중복 검사
router.post('/emailIdCheck', async (req, res) => {
    const result = await emailIdCheck(req.body.id);
    res.send(result);
});

// 닉네임 중복 검사
router.post('/nickCheck', async (req, res) => {
    const result = await nickCheck(req.body.nick);
    res.send(result);
});

module.exports = router;
