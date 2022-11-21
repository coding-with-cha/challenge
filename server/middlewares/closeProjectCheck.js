const Project = require('../models/projectModel')
const projectCloseMiddleware = async(req,res,next)=>{
    try{
        const projectInfo = await Project.findById(req.params.projectId)
       
        if(projectInfo.close == true) {return res.status(401).json({msg:'project already closed'});}
        else{
        next();} 
    }catch(errors){
        console.log(errors)
        res.status(500).json({msg:'something went wrong'});

    }
} 

module.exports = projectCloseMiddleware;