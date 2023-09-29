const rfs=require('rotating-file-stream');
const fs=require('fs');
const path=require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});

const development={
    name: 'development',
    session_cookie_key: 'employeeReviewSystem',
    db: 'ERsystem',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production={
    name: 'production',
    session_cookie_key: process.env.ERS_SESSION_COOKIE_KEY,
    db: process.env.ERS_DB,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}
module.exports=eval(process.env.ERS_ENVIRONMENT)==undefined?development:eval(process.env.ERS_ENVIRONMENT);