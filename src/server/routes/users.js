const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')

router.get('/', userControllers.user_list);

module.exports = router;