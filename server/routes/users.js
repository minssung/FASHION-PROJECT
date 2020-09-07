const express = require('express');
const router = express.Router();
const models = require('../models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = models.user;

// env
const PASSWORD_SECRET_KEY = process.env.PASSWORD_SECRET_KEY;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// DB에서 해당 유저 찾아 유효성 검사
async function loginCheck(info) {
    try {
        const hashPwd = crypto.createHmac('sha256', PASSWORD_SECRET_KEY)
        .update(info.password)
        .digest('hex');

        const result = await User.findOne({
            where: {
                emailId: info.emailId,
                password: hashPwd
            }
        });
        
        return result;

    } catch (err) {
        console.error('Login Check', err);
    }
}

// 회원정보 이메일 중복 검사
async function emailIdCheck(id) {
    try {
        const result = await User.findOne({
            where: { emailId: id }
        });
        return result

    } catch (err) {
        console.error('Email Id Check err', err);
    }
}

// 회원정보 닉네임 중복 검사
async function nickCheck(nick) {
    try {
        const result = await User.findOne({
            where: { nick: nick }
        });
        return result;

    } catch (err) {
        console.error('Nickname Check err', err);
    }
}

// 회원정보 입력받아 DB에 저장
async function insert(info) {
    try {
        const hashPwd = crypto.createHmac('sha256', PASSWORD_SECRET_KEY)
        .update(info.password)
        .digest('hex');

        const result = await User.create({
            emailId: info.emailId,
            password: hashPwd,
            nick: info.nick
        });
        return result

    } catch (err) {
        console.error('User DB Insert err', err);
    }
}

/* GET users listing. */
router.get('/', function(req, res, next) {

});

// 로그인 유효 검사
router.post('/loginCheck', async (req, res, next) => {
    try {
        const result = await loginCheck(req.body.info);

        console.log('result', result);
        if (result) {
            const token = jwt.sign({
                user_id: result._id
            }, JWT_SECRET_KEY, {
                expiresIn: '24h'
            });

            const expiryDate = new Date( Date.now() + 60 * 60 * 1000 * 24 );
            
            res.cookie('user', token, { expires: expiryDate, signed: true });
            res.status(201).send(req.signedCookies);

        } else {
            res.json({ error: 'invalid user' });
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
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
