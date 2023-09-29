const express = require('express'); 
//fetch environment variables
const env = require('./config/environment');
const logger=require('morgan');
const port = 8000; 
const cookieParser = require('cookie-parser');
const app = express(); 

//importing express-ejs-layout
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
//passport setup
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//configuring the database
const MongoStore = require('connect-mongo');

// they are used for showing action notifications
const flash = require('connect-flash'); 
const flashMiddleWare = require('./config/middleware');

app.use(express.urlencoded());
//middleware for cookie parser
app.use(cookieParser());
// For using the file in assets folder.
app.use(express.static('./assets'));
app.use(logger(env.morgan.mode, env.morgan.options));
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// Setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(expressLayout);

// mongo store is used to store the session cookie in the db 
app.use(session({
    name: "ERS",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: `mongodb://127.0.0.1:27017/${env.db}`,
        autoRemove: 'disabled'
    },
        (err) => {
            console.log(err || 'connect-mongo setup ok');
        }
    )
}))

// Using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashMiddleWare.setFlash);

app.use('/' , require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log("Error in running the app.");
        return ;
    }
    console.log("Server is up and running at port ", + port);
});