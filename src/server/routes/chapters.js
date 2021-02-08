const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterControllers')

router.get('/', chapterController.chapter_list);

router.get('/:chapter_id', chapterController.specific_chapter);
module.exports = router;