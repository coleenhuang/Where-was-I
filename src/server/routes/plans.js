const express = require('express');
const router = express.Router();
const planControllers = require('../controllers/planControllers');

router.get('/:user_id', planControllers.user_plans);
router.post('/', planControllers.add_entry);

module.exports = router;