const express = require('express');
const router = express.Router();
const models = require('../models');
const crypto = require('crypto');

const User = models.user;

// env
const PASSWORD_SECRET_KEY = process.env.PASSWORD_SECRET_KEY;

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

// 유저 1명 정보
router.get('/one', async (req, res) => {
    try {
        const result = await User.findOne({ where: {
            emailId: req.query.emailId
        }});

        res.send(result);
    } catch (err) {
        console.log('One user get data', err);
    }
});

// 유저 전체 정보
router.get('/all', async (req, res) => {
    try {
        const result = await User.findAll();
        
        res.send(result);
    } catch (err) {
        console.log('All user get data', err);
    }
});

// 닉네임 업데이트
router.put('/updateNick', async (req, res) => {
    try {
        const result = await User.update({
            nick: req.query.nick
        }, { where: { emailId: req.query.emailId }});

        res.send(result);
    } catch (err) {
        console.log('Nickname Update', err);
    }
});

// 코멘트 업데이트
router.put('/updateComment', async (req, res) => {
    try {
        const result = await User.update({
            comment: req.query.comment
        }, { where: { emailId: req.query.emailId }});

        res.send(result);
    } catch (err) {
        console.log('Comment Update', err);
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
