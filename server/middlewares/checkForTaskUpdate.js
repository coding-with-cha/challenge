const User = require('../models/userModel')
const Project = require('../models/projectModel')
const Task = require('../models/taskModel')

const checkTaskToUpdate = async(req,res,next)=>{
    try{
        const userInfo = await User.findById(req.userId)
        const task = await Task.findById(req.params.taskId)
        const projectId = task.projectAssigned
        const project = await Project.findById(projectId)
        const listAdmin = project.adminsList       
        const existAdmin = listAdmin.includes(req.userId)
        
        if(!existAdmin && !req.userId !== task.taskCreator && userInfo.role !== 'manager') return res.status(401).json({msg:'you are not allowed'});
        next();
    }catch(errors){
        console.log(errors)
        res.status(500).json({msg:'something went wrong'});

    }
} 

module.exports = checkTaskToUpdate;