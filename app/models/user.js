
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        firstName    : String,
        lastName     : String,
        PhoneNumber  : String,
        onListServe  : Boolean,
        isAdmin      : Boolean,
        //still thinking of how to model this one because of space constraints
        resumeLink   : String
    }
});


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
