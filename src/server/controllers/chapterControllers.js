const ChaptersService = require('../services/chaptersService')


exports.list_chapters = function (req, res, next) {
    const knexInstance = req.app.get('db');
    ChaptersService.getAllChapters(knexInstance)
    .then(chapters => {
        res.json(chapters)
    })
    .catch(next)
}

exports.chapter_by_id = function (req, res, next) {
    const knexInstance = req.app.get('db');
    const chapterId = req.params.chapter_id;
    ChaptersService.getById(knexInstance, chapterId)
    .then(chapters => {
        if (!chapters) {
            return res.status(404).json({
              error: { message: `Chapter doesn't exist` }
            })
          }
        res.json(chapters)
    })
    .catch(next)
}


