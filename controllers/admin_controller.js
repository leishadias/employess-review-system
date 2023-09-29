const Users = require('../models/user');

// assigning new review work
module.exports.assignWork = async function(req, res){
    let employee = await Users.find({});

    return res.render('admin',  {
        title : 'Performix | Assign Work',
        employee : employee
    });
}

// show the list of employee working in the company
module.exports.showEmployeeList = async function(req, res){
    if(!req.isAuthenticated()){
        req.flash('error' , 'You are not Authorized');
        return res.redirect('/users/sign-in');
    }
    if(req.user.isAdmin == false){
        req.flash('error' , 'You are not Authorized');
        return res.redirect('/');
    }
    let employeeList = await Users.find({});

    return res.render('employee', {
        title : "Performix | Employee-List",
        employee : employeeList
    });
}

//set the reviewer and reviewee.
module.exports.setReviewerAndReviewee = async function(req, res){
    try{
        if(!req.isAuthenticated()){
            req.flash('success' , 'Please Login');
            return res.redirect('/users/sign-in');
        }else{
            let employee = await Users.findById(req.user.id);

            if(employee.isAdmin == false){
                req.flash('error', 'You are not Authorized');
                return res.redirect('/');
            }else if(req.body.sender == req.body.receiver){
                req.flash('error', 'Sender and receiver should not be the same');
                return res.redirect('back');
            }else{
                //if user not seslected
                if (req.body.sender == 'Sender' || req.body.sender == 'Receiver'){
                    req.flash('error', 'Select valid sender and receiver');
                    return res.redirect('back');
                }

                let sender = await Users.findById(req.body.sender);
                let receiver = await Users.findById(req.body.receiver);
                sender.userToReview.push(receiver);
                sender.save();
                receiver.reviewReceivedFrom.push(sender);
                receiver.save();
                req.flash('success', 'Task Assigned!');
                return res.redirect('back');
            }
        }
    }catch(err){
        console.log("Error", err);
    }
}

// assigning new Admin
module.exports.newAdmin = async function(req, res){
    try{
        if(!req.isAuthenticated()){
            req.flash("success" , 'Please LogIn');
            return res.redirect('/users/sign-in');
        }
        if(req.user.isAdmin == false){
            req.flash('error' , 'You are not Admin!');
            return res.redirect('/');
        }
        if(req.user.isAdmin){
            let user = await Users.findById(req.body.selectedUser);
            if(!user){
                req.flash('error', "User doesn't exist");
                return res.redirect('back');
            }
            user.isAdmin = "true";
            user.save();
            req.flash('success' , 'New Admin Added');
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

// deleting an employee
module.exports.deleteEmployee = async function(req, res){
    try{
        if(!req.isAuthenticated()){
            req.flash('error' , 'Please Login')
            return res.redirect('users/sign-in');
        }
        if(!req.user.isAdmin){
            req.flash('error' , 'You are not admin!')
            return res.redirect('/');
        }

        // Deleting the user.
        let employee = await Users.deleteOne({_id : req.params.id});
        req.flash('success' , 'User Deleted!')
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//render add new employee page
module.exports.addEmployee = async function(req, res){
    let employee = await Users.find({});
    return res.render('addEmployee', {
        title : 'Performix | Add Employee',
        employee : employee
    });
}