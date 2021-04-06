const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')

router.get('/', userControllers.list_users);
router.get('/:user_id', userControllers.get_by_id);
router.post('/', userControllers.create_user);

module.exports = router;