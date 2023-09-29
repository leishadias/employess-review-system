const express = require('express');
const router = express.Router();
//passport for authorization ,and authentication
const passport = require('passport');
const userController = require('../controllers/users_controller');

//Render  sign-in page and sign-Up page
router.get('/sign-in' , userController.signIn);
router.get('/sign-up' , userController.signUp);

//Create new session for a user and also it check the authorization
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
    ), userController.createSession);

//Create new user
router.post('/create' , userController.create);
//logout current user
router.get('/sign-out', userController.destroySession);

//render forgot password page
router.get('/forgotPassword', userController.forgotPasswordPage);
//change password
router.post('/forgotPasswordLink' , userController.forgotPasswordLink);

//add employee
router.post('/addEmployee', userController.addEmployeee);
//make an employee as admin
router.post('/makeAdmin', userController.makeAdmin);

module.exports = router;