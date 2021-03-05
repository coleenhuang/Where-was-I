const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')

router.get('/', userControllers.user_list);
router.get('/:user_id', userControllers.specific_user);
router.post('/', userControllers.create_user);

module.exports = router;