const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminController = require('../controllers/admin_controller');

//assigning employees to be reviewed
router.get('/assignWork' , passport.checkAuthentication , adminController.assignWork);

//view employee list
router.get('/view-employee', passport.checkAuthentication , adminController.showEmployeeList);
//assigning review task
router.post('/setReviews', passport.checkAuthentication , adminController.setReviewerAndReviewee);
//make Admin
router.post('/newAdmin', passport.checkAuthentication , adminController.newAdmin);
//delete employee
router.get('/deleteEmployee/:id', passport.checkAuthentication , adminController.deleteEmployee);
//add employee
router.get('/add-employee' , passport.checkAuthentication , adminController.addEmployee);

module.exports = router;