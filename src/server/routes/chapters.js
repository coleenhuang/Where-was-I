const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterControllers')

router.get('/', chapterController.list_chapters);

router.get('/:chapter_id', chapterController.chapter_by_id);

router.get('/:book_id/:chapter_name', chapterController.chapter_by_name);

module.exports = router;