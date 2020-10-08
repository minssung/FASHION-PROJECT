const express = require('express');
const router = express.Router();
const models = require('../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

process.env.NODE_ENV === 'production' ? configs = require('../config/config.json').production : configs = require('../config/config.json').development;

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

// 서버 루트경로 server/uploads 경로에 이미지 저장
fs.readdir('./uploads', (error, files) => {
    if (error) {
        fs.mkdirSync('./uploads');
    }
})

// 이미지 파일 형식 : 파일명.timestamp.확장명
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + '.' + new Date().getTime() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})

// 파일 DB에 저장
router.post('/upload', upload.single('img'), (req, res) => {
    try {
        if (req.file === undefined) {
            console.log('client/Mypage.js FormData', req.file);
            console.log('파일명', req.query.photo);
        } else {
            // 이미지 파일 선택한 경우
            // 전에 있던 파일 삭제 -> 새로 저장
            const filePath = path.join(__dirname, '../uploads', req.query.photo);

            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) return console.log('삭제할 수 없는 파일입니다');
            
                fs.unlink(filePath, (err) => err ?  
                    console.log(err) : console.log(`${filePath} 를 정상적으로 삭제했습니다`));
            })

            User.update({photo: req.file.filename}, {where: {emailId: req.query.emailId}});

            res.json({ url: req.file.filename });
        }
        
    } catch (err) {
        console.log('profile photo', err);
    }
    
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
