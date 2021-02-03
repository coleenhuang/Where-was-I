const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterControllers')

router.get('/', chapterController.chapter_list);

router.get('/:chapter_id')
module.exports = router;