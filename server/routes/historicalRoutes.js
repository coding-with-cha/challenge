const express = require('express');
const { getHistorical } = require('../controllers/historicalControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router()

router.get('/', authMiddleware, getHistorical)

module.exports = router; 