const User = require('../models/user')
const Review = require('../models/review')

//create a new review
module.exports.newReview = async (req, res) => {
    try {
        let recipient = await User.findById(req.params.id);
        if (!recipient){
            req.flash('error' , "Recipient is not valid");
            return res.redirect('/');
        }
        if (req.user) {
            //create new review
            const new_review = await Review.create({
                reviewer : req.user.id,
                reviewed: recipient.id,
                content: req.query.newReview,
            });
            //remove from user's list of 'users to be reviewed'
            for(let i = 0; i<req.user.userToReview.length ; i++){
                if (req.user.userToReview[i] == recipient.id) {
                    let deleted = await req.user.userToReview.splice(i, 1);
                    await req.user.save();
                    //break; -> remove multiple entries if present
                }   
            }
            return res.redirect('/');
        } else {
            req.flash('error' , "Please Login!");
            return res.redirect("/users/sign-in");
        }
    } catch (err) {
        req.flash('error', "Please try again");
        console.log('error', err);
        return;
    }
}