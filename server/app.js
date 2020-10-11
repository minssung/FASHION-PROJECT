require('dotenv').config();

// Modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sequelize = require('./models').sequelize;

// Router 정의
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postingRouter = require('./routes/posting');

const app = express();

process.env.NODE_ENV === 'production' ? configs = require('./config/config.json').production : configs = require('./config/config.json').development;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", configs.client_domain);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posting',postingRouter);
/** 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
*/

const port = process.env.PORT;

sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
});

module.exports = app;
