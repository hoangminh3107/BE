var db = require('./db');
const userSchema = new db.mongoose.Schema(
    { 
        name: {type : String, required: true},
        password: {type : String, required: true},
        email: {type : String,required: false},
        avatar: {type : String,required:false},
        role: {type : String,required:false},
        birthday: {type : Date, required:false},
        gender: {type : String,required:false},
        phone: {type : String,required:false},
    },
    {
        collection: 'users'
    }
);

let userModel = db.mongoose.model('userModel', userSchema);

module.exports = {
    userModel
}