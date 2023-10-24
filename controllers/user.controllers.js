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

exports.register = async (req, res, next)=>{
    console.log(req.body.rePassword);
    if(req.body.password != req.body.rePassword){
        return res.status(500).json({ msg: "Mật khẩu nhập lại không đúng"})
    }else{
    try {
        const salt = await bcrypt.genSalt(10);
 
        const user = new userModel.userModel(req.body);
 
        user.password = await bcrypt.hash(req.body.password, salt);

        await user.generateAuthToken();
 
        let new_u = await user.save()
 
 
        return res.status(200).json({ user: new_u })
 
 
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: error.message})
    }
}

 
}

exports.login = async (req, res, next)=>{
   
    console.log(req.body);
    
    try {
        const user = await userModel.userModel.findOne({username: req.body.username});
        console.log(user);
        if (!user) {
            console.log("Không tồn tại tài khoản");
            return res.status(401).json({msg: "Không tồn tại tài khoản"})
        }else{
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordMatch) {
                console.log("sai mật khẩu");
                return res.status(401).json({msg: "sai mật khẩu"})
            }else{
                console.log('Đăng nhập thành công');
                return res.status(200).json({data: user, msg: "Đăng nhập thành công"})
            }
        }        
 
    } catch (error) {
        console.log(error);
        return res.status(401).json({msg: "Sai tài khoản hoặc mật khẩu"})
    }
}