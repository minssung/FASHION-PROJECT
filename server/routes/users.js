var express = require('express');
var router = express.Router();
const User = require('../models/users');

// DB에서 해당 유저 찾아 유효성 검사
async function loginCheck(info) {
    User.find(function(error, users){
        if (error) {
            console.log(error);
        } else {
            console.log(users);
        }
    });
}

// 회원정보 입력받아 DB에 저장
function insert(info) {
    const newUser = new User({
        emailId: info.emailId,
        password: info.password,
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
router.post('/loginCheck', (req, res) => {
    const result = loginCheck();
    res.send(result);
});

// 회원정보 입력
router.post('/insert', (req, res) => {
    const result = insert(req.body.info);
    res.send(result);
});

module.exports = router;
