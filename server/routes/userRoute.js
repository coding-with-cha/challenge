const express = require('express');
const { register, login, loadUserInfo, getUserById, allUsers, updateListProjectUser} = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router()
const userValidation = require('../middlewares/userValidator')
const managerCheckMiddleware = require('../middlewares/managerCheck');


router.post('/register',
userValidation,
register); 

router.post('/login', 
userValidation,
login)

router.get('/',authMiddleware,loadUserInfo)

router.get('/:userId',authMiddleware,getUserById)

router.get('/all/users',authMiddleware,allUsers)

router.put('/projectList/:userId', authMiddleware,managerCheckMiddleware, updateListProjectUser)

module.exports = router;