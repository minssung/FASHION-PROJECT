const express = require('express');
const router = express.Router();
const models = require('../models');
const crypto = require('crypto');
const { send } = require('process');

const Posting = models.posting;

//포스팅 회원가입 정보가 들어올때 검사하는 곳

// env
const PASSWORD_SECRET_KEY = process.env.PASSWORD_SECRET_KEY;


//포스팅 정보 DB에 저장
function posting_insert(posting_data) {
    try {
        const hashPwd = crypto.createHmac('sha256', PASSWORD_SECRET_KEY)
        const result = Posting.create({
            image: posting_data.file,
            top_tag : posting_data.top_tag,
            outer_tag : posting_data.outer_tag,
            bottom_tag : posting_data.bottom_tag,
            shoes_tag : posting_data.shoes_tag,
        });
        return result

    } catch (err) {
        console.error('Posting DB Insert err', err);
    }
}



router.post('/insert', (req, res) => {
    const result = posting_insert(req.body.posting_data);
    res.send(result);
});

module.exports = router;