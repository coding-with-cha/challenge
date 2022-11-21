const User = require('../models/userModel')
const Project = require('../models/projectModel')
const Task = require('../models/taskModel')
const Historical = require('../models/historicalModel')

// @desc create a project
// @route POST /api/project
//@ access PRIVATE manager
const createProject = async(req, res)=>{
    try{
        const {title, description} = req.body;
        await Project.create({title, description})

        await Historical.create({
            entity:"Project", 
            $push:{historicalArray: {"action":"create"}}
        })

        res.status(201).json({msg:'project created'})
    }catch(error)
    {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc get all projects
// @route GET /api/project
//@ access PRIVATE manager
const getProjects = async(req, res)=>{
    try{
        const projects = await Project.find({});
        res.status(200).json(projects)
    }catch(error)
    {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc update a project by id
// @route PUT /api/project/:projectId
//@ access PRIVATE manager/admin
const updateProject = async(req,res)=>{
    try {
        await Project.findByIdAndUpdate(req.params.projectId,{...req.body})
        
        await Historical.find({entity:"Project"}).update({
            $push:{historicalArray: {"action":"update"}}
        })

        res.status(200).json({msg:'successfully updated'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc update a project by id
// @route PUT /api/project/close/:projectId
//@ access PRIVATE manager
const closeProject = async(req,res)=>{
    try {
        console.log(req.params.projectId)
        await Project.findByIdAndUpdate(req.params.projectId,{close: true})
        
        await Historical.find({entity:"Project"}).update({
            $push:{historicalArray: {"action":"close"}}
        })

        res.status(200).json({msg:'successfully closed'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}


// @desc update a project by id
// @route PUT /api/project/adminsList/:projectId
//@ access PRIVATE manager
const updateListAdmin = async(req,res)=>{
    try {
        console.log(req.params.projectId)
        console.log(req.body.userId)
        const project = await Project.findById(req.params.projectId)
        const listAdmin = project.adminsList
        const existAdmin = listAdmin.includes(req.body.userId)
        if(!existAdmin){
        await Project.findByIdAndUpdate(req.params.projectId,{
            $push:{adminsList: req.body.userId}
        })

        
        
        await Historical.find({entity:"Project"}).update({
            $push:{historicalArray: {"action":"update list admin"}}
        })

        return res.status(200).json({msg:'successfully added'})
    }
        res.status(400).json({msg:'already exist'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc update a project status by id
// @route PUT /api/project/status/:projectId
//@ set automatically 
const updateStatusProject = async(req,res)=>{
    try { 
        let nb5 = 0; 
        let nb10 = 0;
        let nb3 = 0;
        const listTasks = await Task.find({projectAssigned:req.params.projectId})
        for(let i=0; i<listTasks.length; i++){
            let days = parseInt((Date.now() - listTasks[i].creationDate)/(1000 * 60 * 60 * 24))
            if(days>5){nb5++}
            if(days>10){nb10++}
            if(days>3){nb3++}
        }
        
         if(nb10 !== 0 && nb10<=3){
            const data = await Project.findByIdAndUpdate(req.params.projectId,{status:"Red"})
            res.json(data)
         }
         else if(nb5 != 0 && nb5 <= 3){
            const data = await Project.findByIdAndUpdate(req.params.projectId,{status:"Yellow"})
            res.json(data)
        }
         else if(nb5 != 0 && nb5 >= 4){
            const data = await Project.findByIdAndUpdate(req.params.projectId,{status:"Red"})
            res.json(data)
        }
         else if(nb3 != 0 && nb3 >= 5){
            const data = await Project.findByIdAndUpdate(req.params.projectId,{status:"Yellow"})
            res.json(data)
        }
        
        await Historical.find({entity:"Project"}).update({
            $push:{historicalArray: {"action":"update status project"}}
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// // @desc update a project by id
// // @route PUT /api/project/usersList/:projectId
// //@ access PRIVATE manager-admin
const updateListUsers = async(req,res)=>{
    try {
        await Project.findByIdAndUpdate(req.params.projectId,{
            $push:{usersList: req.body._id}
        })

        await Historical.find({entity:"Project"}).update({
            $push:{historicalArray: {"action":"update list user"}}
        })

        res.status(200).json({msg:'successfully added'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}
// @desc get project By id
// @route GET /api/project/:projectId
//@ access PRIVATE manager
const getProjectById = async(req, res)=>{
    try{
        const project = await Project.find({_id: req.params.projectId})
        res.status(200).json(project)
    }catch(error)
    {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}
module.exports = {createProject, getProjects, updateProject, closeProject, updateListAdmin, updateListUsers, updateStatusProject, getProjectById}