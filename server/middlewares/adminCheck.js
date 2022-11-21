const User = require('../models/userModel')
const adminCheckMiddleware = async(req,res,next)=>{
    try{
        const userInfo = await User.findById(req.userId)
        if(userInfo.role !== 'admin') return res.status(401).json({msg:'you are not allowed'});
        next();
    }catch(errors){
        console.log(errors)
        res.status(500).json({msg:'something went wrong'});

    }
} 

module.exports = adminCheckMiddleware;