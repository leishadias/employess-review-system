const User = require('../models/user');

// redering the sign-in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title : 'Performix | Sign-In'
    });
}

//login
module.exports.createSession = async function(req, res){
    req.flash('success', 'You have successfuly logged In');
    return res.redirect('/');
}

//rendering the sign-up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title : 'Performix | Sign-Up'
    });
}

//creating a new user
module.exports.create = async function(req, res){
    //password and confirm password doesn't match
    if(req.body.password != req.body.confirmPassword){
        req.flash('error' , 'Password should be same as Confirm Password');
        return res.redirect('back');
    }
    //check if already user exists with that email
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        return res.redirect('/users/sign-in');
    }
    req.flash('error' , 'Account already exists');
    return res.redirect('back');
}

//logging Out
module.exports.destroySession = function (req, res, done){
    return req.logout((err) =>{
        if(err){
            return done(err);
        }
        req.flash('success' , 'Logged Out Sucessfully!');
        return res.redirect('/users/sign-in');
    }); 
}

// render forgot password page
module.exports.forgotPasswordPage = function(req, res){
    return res.render('forgot_password',{
        title : 'Performix | Forgot Password'
    });
}

// update existing password
module.exports.forgotPasswordLink = async function(req, res){
    let user = await User.findOne({ email: req.body.email });
    if(!user){
        req.flash('error' , "User doesn't exist");
        return res.redirect('/users/sign-up');
    }
    if(req.body.password == req.body.confirmPassword){
        user.password = req.body.password;
        await user.updateOne({password : req.body.password});
        req.flash('success' , 'Password Changed');
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');
}

// Adding a new employee, it is similar to signup page, but this will not redirect to the sign-in page
module.exports.addEmployeee = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        req.flash('error' , 'Password should be same as Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        req.flash('success', 'User created');
        return res.redirect('back');
    }
    req.flash('error' , 'Account already exists');
    return res.redirect('back');
}

//make user as admin
module.exports.makeAdmin = async function(req, res){
    try {
        //if user enters this password then that user is made as admin
        if (req.body.admin_password == 'admin123') {
            let user = await User.findById(req.user.id );
            user.isAdmin = true;
            user.save();
            req.flash('success', 'You are now an admin');
            return res.redirect('back');
        } else {
            req.flash('error', 'Wrong password');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', 'Please try again');
        console.log('Error', error);
        return;
    }
}