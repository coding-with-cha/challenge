const Task = require('../models/taskModel')
const Historical = require('../models/historicalModel')

// @desc create task
// @route POST /api/task/:projectId
//@ access PRIVATE manager-admin-user
const createTask = async(req, res)=>{
    try{
        const {title, description, completionDate} = req.body;
        await Task.create({title, description, taskCreator:req.userId, projectAssigned:req.params.projectId, completionDate})
        
        await Historical.create({
            entity:"Task", 
            $push:{historicalArray: {"action":"create"}}
        })

        res.status(201).json({msg:'Task created'})
    }catch(error)
    {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc get tasks for owner
// @route GET /api/task/myTasks
//@ access PRIVATE - owner/taskCreator
const getTaskUser = async(req, res)=>{
    try{
        const tasks = await Task.find({taskCreator: req.userId})
        res.status(200).json(tasks)
    }catch(error)
    {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc get tasks of a project by projectId
// @route GET /api/task/tasksOFProject/:projectId
//@ access PRIVATE manager - admin of the project - user 
const getTaskProject = async(req, res)=>{
    try{
        console.log(req.params.projectId)
            const tasks = await Task.find({projectAssigned: req.params.projectId})
            res.status(200).json(tasks)
    }catch(error)
    {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc update Task by id / add assignedTo
// @route PUT /api/task/assignedTo/:taskId
//@ access PRIVATE - taskCreator - admin - manager
const addTaskAssignedTo = async(req,res)=>{
    try {
        const task = Task.findById(req.params.taskId)
        await Task.findByIdAndUpdate(req.params.taskId,{assignedTo:req.body._id, status:'Active'})
        await User.findByIdAndUpdate(req.body._id,{
            $push:{projectsList:task.projectAssigned}
        })

        await Historical.find({entity:"Task"}).update({
            $push:{historicalArray: {"action":"update"}}
        })

        res.status(200).json({msg:'assigned to updated'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc update a task by id
// @route PUT /api/task/:taskId
//@ access PRIVATE -owner - admin - manager
const updateTask = async(req,res)=>{
    try {
        const taskInfo = await Task.findByIdAndUpdate(req.params.taskId,{...req.body})

        await Historical.find({entity:"Task"}).update({
            $push:{historicalArray: {"action":"update"}}
        })

        res.json(taskInfo)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc update a status task by id to Done
// @route PUT /api/task/done/:taskId
//@ access PRIVATE - creator - admin - manager
const doneTask = async(req,res)=>{
    try {
        await Task.findByIdAndUpdate(req.params.taskId,{status:'Done'})

        await Historical.find({entity:"Task"}).update({
            $push:{historicalArray: {"action":"update status"}}
        })

        res.status(200).json({msg:'successfully updated'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc delete a task by id
// @route DELETE /api/task/:taskId
//@ access PRIVATE - admin - owner - manager
const deleteTask = async(req,res)=>{
    try {
        await Task.findByIdAndDelete(req.params.taskId)

        await Historical.find({entity:"Task"}).update({
            $push:{historicalArray: {"action":"delete"}}
        })

        res.status(200).json({msg:'successfully deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
} 

module.exports = {createTask, addTaskAssignedTo, getTaskUser, getTaskProject, updateTask, deleteTask, doneTask}