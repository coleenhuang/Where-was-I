const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterControllers')

router.get('/', chapterController.chapter_list);

router.get('/:chapter_id', chapterController.specific_chapter);


//FIXME: not implemented yet
router.get('/:chapter_id/verses') 

module.exports = router;