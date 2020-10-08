const express = require('express');
const router = express.Router();
const models = require('../models');
const crypto = require('crypto');
const { send } = require('process');
const multer = require('multer');
const app = require('../app');
const upload = multer({dest: './uploads'});

const Posting = models.posting;

//포스팅 회원가입 정보가 들어올때 검사하는 곳


router.get('/', async(req,res,next) => {
    try {
        const postingdata = await Posting.findAll({
        });
        // console.log(postingdata);
        // const basePosting = postingdata.toString('base64');
        // console.log(basePosting);
        // console.log(postingdata);
        res.send(postingdata);
    } 
    catch(err){
        console.error(err);
        next(err);
    }
    
});


//포스팅 정보 DB에 저장
function posting_insert(posting_data, postimg) {
    try {
        const result = Posting.create({
            image: '/uploads/' + postimg.filename+".jpg",
            top_tag : posting_data.top_tag,
            outer_tag : posting_data.outer_tag,
            bottom_tag : posting_data.bottom_tag,
            shoes_tag : posting_data.shoes_tag,
            content : posting_data.content,
        });
        return result

    } catch (err) {
        console.error('Posting DB Insert err', err);
    }
}



router.post('/insert',upload.single('file'), (req, res) => {
    const result = posting_insert(req.body, req.file);
    // console.log(req.file);
    // console.log(req.body.outer_tag);
    console.log("데이터삽입 성공");
    res.send(result);
});

module.exports = router;