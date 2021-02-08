const { pool } = require('../config');

exports.chapter_list = function (req, res) {
    //gets all chapters
    pool.query('SELECT * FROM chapters', (error, results) => {
        if (error) {
            throw(error)
        }
        res.status(200).json(results.rows)
    })
}

exports.specific_chapter = function(req, res) {
    //gets specific chapter
    const chapterId = req.params.chapter_id;
    pool.query('SELECT * FROM chapters WHERE id = $1', [chapterId], (error, results) => {
        if (error) {
            throw(error)
        }
        if (results.rows.length <= 0) {
            return res.status(404).json({
                error: { message: `Chapter doesn't exist` }
              })
        }

        res.status(200).json(results.rows)
    })

}