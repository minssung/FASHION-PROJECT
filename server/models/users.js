const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 한국시간으로 Date 포멧 변환
// 몽고디비는 Date 타입 변환이 불가능함.
function getCurrentDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();

    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

// 스키마 컬렉션 지정
function user() {
    try {
        const userSchema = new Schema({
            emailId: String,
            password: String,
            nick: String,
            createdAt: { type: Date, default: getCurrentDate() }
        });
        return userSchema

    } catch (err) {
        console.log('Create User Error', err);
    }
}

module.exports = mongoose.model('user', user());