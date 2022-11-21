const User = require('../models/userModel')
const Project = require('../models/projectModel')

const adminManagerMiddleware = async(req,res,next)=>{
    try{
        const userInfo = await User.findById(req.userId)
        const project = await Project.findById(req.params.projectId)
        const adminList = project.adminsList
        if(userInfo.role !== 'manager' && !adminList.includes(req.userId) ) return res.status(401).json({msg:'you are not allowed'});
        next();
    }catch(errors){
        console.log(errors)
        res.status(500).json({msg:'something went wrong'});

    }
} 

module.exports = adminManagerMiddleware;