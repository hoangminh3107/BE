var db = require('./db');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcrypt");

const userSchema = new db.mongoose.Schema(
    { 
        username: {type : String, required: true},
        password: {type : String, required: true},
        email: {type : String, required: false},
        avatar: {type : String, required:false},
        role: {type : String, required:false},
        birthday: {type : Date, required:false},
        gender: {type : String, required:false},
        phone: {type : String, required:false},
        token: {type: String, required: false}
    },
    {
        collection: 'users'
    }
);



/**
* Hàm tạo token để đăng nhập với API
* @returns {Promise<*>}
*/
userSchema.methods.generateAuthToken = async function () {


    const user = this
    console.log(user)
    const token = jwt.sign({_id: user._id, username: user.username}, chuoi_ky_tu_bi_mat)
   
    user.token = token;
    await user.save()
    return token
 }
 
 
 /**
 * Hàm tìm kiếm user theo tài khoản
 * @param username
 * @param passwd
 * @returns {Promise<*>}
 */
 userSchema.statics.findByCredentials = async (name, password) => {
 
 
    const user = await userModel.findOne({name})
    if (!user) {
        throw new Error({error: 'Không tồn tại user'})
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({error: 'Sai password'})
    }
    return user
 }
 


let userModel = db.mongoose.model('userModel', userSchema);

module.exports = {
    userModel
}