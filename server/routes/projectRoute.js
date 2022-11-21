const express = require('express');
const {createProject, getProjects, updateProject, closeProject, updateListAdmin, updateListUsers, updateStatusProject, getProjectById} = require('../controllers/projectControllers');
const adminManagerMiddleware = require('../middlewares/adminManager');
const authMiddleware = require('../middlewares/authMiddleware');
const adminInListAdmin = require('../middlewares/checkAdminInListAdmin');
const projectCloseMiddleware = require('../middlewares/closeProjectCheck');
const managerCheckMiddleware = require('../middlewares/managerCheck');
const router = express.Router()

router.post('/',authMiddleware,managerCheckMiddleware, createProject);
router.get('/', authMiddleware, managerCheckMiddleware, getProjects)
router.get('/:projectId', authMiddleware, managerCheckMiddleware, getProjectById)
router.put('/:projectId', authMiddleware, adminManagerMiddleware, projectCloseMiddleware, updateProject)

router.put('/closeProject/:projectId', authMiddleware, managerCheckMiddleware, projectCloseMiddleware, closeProject)

router.put('/adminsList/:projectId', authMiddleware, managerCheckMiddleware, projectCloseMiddleware, updateListAdmin)
router.put('/adminUpAdminsList/:projectId', authMiddleware, adminInListAdmin, projectCloseMiddleware, updateListAdmin)
router.put('/usersList/:projectId', authMiddleware, adminManagerMiddleware,projectCloseMiddleware, updateListUsers)
router.put('/status/:projectId', authMiddleware,updateStatusProject)
module.exports = router;    