const express = require('express');
const router = express.Router();
const models = require('../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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

// 클라이언트 public/uploads 경로에 이미지 저장
fs.readdir('../client/public/uploads', (error, files) => {
    if (error) {
        fs.mkdirSync('../client/public/uploads');
    }
})

// 이미지 파일 형식 : 파일명.timestamp.확장명
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, '../client/public/uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + '.' + new Date().getTime() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})

router.post('/upload', upload.single('img'), (req, res) => {
    const imgRoute = `/uploads/${req.file.filename}`;
    // user DB photo 컬럼에 imgRoute 값 추가 (where은 emailId 로 참조)
    
    console.log(req.file);
    res.json({ url: imgRoute });
})

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
            res.send(decoded);

        } else {
            res.send("");
        }
        
    } catch (err) {
        console.log('Token verify', err);
    }
});

module.exports = router;
