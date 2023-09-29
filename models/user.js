const mongoose = require('mongoose');

//Contains all the basic imformation of a user
const UserSchema = new mongoose.Schema({
    name :{
        type : 'String',
        required: true
    },
    email : {
        type : 'String',
        required : true,
        unique : true
    },
    password : {
        type : 'String',
        required : true
    },
    isAdmin : {
        type : 'Boolean',
        required : true
    },
    //users to be reviewed
    userToReview : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    // recieved reviews
    reviewReceivedFrom: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }]
}, 
{
    timestamps : true
}
);

const User = mongoose.model('User', UserSchema);
module.exports = User;