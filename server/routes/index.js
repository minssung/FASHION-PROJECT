var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

// env
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// 쿠키 이용하여 로그인 처리 먼저 하기
// 로그인을 하고 난 후 보내는 API 요청마다 쿠키 정보를 검사하여 쿠키에 있는 jwt가 유효한지 검사
const verifyToken = (req, res, next, user) => {
    try {
        const clientToken = req.signedCookies.user;
        console.log(clientToken)
        return clientToken
        // const decoded = jwt.verify(clientToken, JWT_SECRET_KEY);

        // console.log(clientToken);
        // console.log(decoded);

        // if (decoded) {
        //     res.locals.userId = decoded.user_id;
        //     next();

        // } else {
        //     res.status(401).json({ error: 'unauthorized' });

        // }

    } catch (err) {
        res.status(401).json({ error: 'token expired' });
    }
};

/* GET home page. */
router.get('/cookie', (req, res) => {
    res.cookie('cookies', 'is sweet', { signed: true });
    res.send(req.signedCookies);
});

router.post('/auth', (req, res) => {
    const result = verifyToken(req.body.user);
    res.send(result);
})

module.exports = router;
