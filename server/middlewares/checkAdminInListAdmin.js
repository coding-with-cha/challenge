const User = require('../models/userModel')
const Project = require('../models/projectModel')

const adminInListAdmin = async(req,res,next)=>{
    try{
        const projectInfo = await Project.findById(req.params.projectId)
        const listAdmin = projectInfo.adminsList
        if(!listAdmin.includes(req.userId)) return res.status(401).json({msg:'you are not allowed'});
        next();
    }catch(errors){
        console.log(errors)
        res.status(500).json({msg:'something went wrong'});

    }
} 

module.exports = adminInListAdmin;