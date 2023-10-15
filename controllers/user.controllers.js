var userModel = require('../models/users.model');
const bcrypt = require('bcrypt');
exports.listUser = async (req, res, next)=>{
    try {
        let list = await userModel.userModel.find();
        console.log(list);
        if(list){
            return  res.status(200).json({data: list, msg: 'Lấy dữ liệu thành công'});
        }else{
            return res.status(204).json({msg: 'Không có dữ liệu'});
        }
 
 
    } catch (error) {
        return res.status(500).json({msg:  error.message });
    }
 
 }

 exports.reg = async (req, res, next)=>{
    console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
 
 
        const user = new userModel.userModel(req.body);
 
 
        user.password = await bcrypt.hash(req.body.password, salt);

        // const token = await user.generateAuthToken();
 
 
        let new_u = await user.save()
 
 
        return res.status(201).json({ user: new_u })
 
 
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: error.message})
 
 
    }
 
 }