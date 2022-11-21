const express = require('express');
const { createTask, getTaskUser, getTaskProject, addTaskAssignedTo, updateTask, deleteTask, doneTask } = require('../controllers/taskControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const checkTask = require('../middlewares/checkForTask');
const checkTaskToUpdate = require('../middlewares/checkForTaskUpdate');
const router = express.Router()

router.post('/:projectId', authMiddleware, checkTask, createTask)
router.get('/myTasks',authMiddleware,getTaskUser)

router.get('/tasksOFProject/:projectId',authMiddleware, checkTask, getTaskProject)

router.put('/assignedTo/:taskId', authMiddleware, checkTaskToUpdate,addTaskAssignedTo)
router.put('/:taskId',authMiddleware,checkTaskToUpdate,updateTask)
router.delete('/:taskId',authMiddleware,checkTaskToUpdate,deleteTask)
router.put('/done/:taskId',authMiddleware,checkTaskToUpdate,doneTask)
 
module.exports = router; 