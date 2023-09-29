const User = require('../models/user');
const Review = require('../models/review');

module.exports.home = async function(req, res){
    try{
        if (!req.isAuthenticated()) {
            req.flash('error' , 'Please LogIn!');
            return res.redirect('/users/sign-in');
        }
        // Fetching the user details
        let user = await User.findById(req.user.id);
        //fetching the reviews received
        let review = await Review.find({ reviewed: req.user.id });

        // fetch details of the review recipent
        let recipent = [];
        for(let i = 0; i<user.userToReview.length ; i++){
            let userName = await User.findById(user.userToReview[i]);
            recipent.push(userName);
        }

        // fetch necessary details pf the reviewer
        let reviews = [];
        for(let i = 0; i<review.length ; i++){
            let reviewUser = await User.findById(review[i].reviewer);
            if(reviewUser != null){
                let currUser = {
                    name : reviewUser.name,
                    content : review[i].content
                }
                reviews.push(currUser);
            }
        }
        //employee list
        let employee = await User.find({});
        return res.render('home',{
            title : "Performix | Home",
            recipent : recipent,
            reviews : reviews,
            user : user,
            employee : employee
        });

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}