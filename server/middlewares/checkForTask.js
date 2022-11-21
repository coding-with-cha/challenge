const User = require('../models/userModel')
const Project = require('../models/projectModel')

const checkTask = async(req,res,next)=>{
    try{
        const userInfo = await User.findById(req.userId)
        const project = await Project.findById(req.params.projectId)
        const listAdmin = project.adminsList
        const listUser = project.usersList
        const existAdmin = listAdmin.includes(req.userId)
        const existUser = listUser.includes(req.userId)
        
        if(!existAdmin && !existUser && userInfo.role !== 'manager') return res.status(401).json({msg:'you are not allowed'});
        next();
    }catch(errors){
        console.log(errors)
        res.status(500).json({msg:'something went wrong'});
    }
} 

module.exports = checkTask;