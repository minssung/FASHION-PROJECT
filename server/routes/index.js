const express = require('express');
const router = express.Router();
const models = require('../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

// 로그인 유효 검사
router.post('/login', async (req, res, next) => {
    try {
        const result = await loginCheck(req.body.info);

        if (result) {
            const token = jwt.sign({
                user_id: result.dataValues.emailId
            }, JWT_SECRET_KEY, {
                expiresIn: '24h'
            });

            const expiryDate = new Date( Date.now() + 60 * 60 * 1000 * 24 );
         
            res.cookie('user', token, { expires: expiryDate, signed: false });
            res.status(201).send(req.cookies);

        } else {
            res.json({ error: 'invalid user' });
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/verify', (req, res) => {
    try {
        let token = req.headers['x-access-token'];

        if (token !== 'undefined') {
            let decoded = jwt.verify(token, JWT_SECRET_KEY);
            res.send("인증 성공");

        } else {
            res.send("");
        }
        
    } catch (err) {
        console.log('Token verify', err);
    }
});

router.get('/getToken', (req, res) => {
    const token = req.signedCookies.user;
    console.log(token)
    res.send(token);
})
router.get('/', async (req, res, next) => {
    try {
        const postingdata = await posting.findAll();
        res.render('app', { postingdata });
        console.log(postingdata);
    } catch (err) {
        console.error(err);
        next(err);
    }
});



module.exports = router;
