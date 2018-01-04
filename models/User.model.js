var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        bcrpt: true,
        required: true
    }
});

UserSchema.methods = {
    authenticate: function (candidatePassword, has, callback) {
        bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
            if (err) {
                callback(null, isMatch);
            }
        })
    }
}

module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser,cb)=>{
    bcrypt.hash(newUser.password,bcrypt.genSaltSync(SALT_WORK_FACTOR),null,function(err,hash){
        if(err) throw err;
        newUser.password=hash;
        console.log('user is saved');

        newUser.save(cb);
    })
}