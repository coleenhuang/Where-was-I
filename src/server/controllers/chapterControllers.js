const { pool } = require('../config');

exports.chapter_list = function (req, res) {
    //gets all chapters
    pool.query('SELECT c.id, c.chapter_name, b.book_name FROM chapters c, books b WHERE c.book_id = b.id', (error, results) => {
        if (error) {
            throw(error)
        }
        res.status(200).json(results.rows)
    })
}

exports.specific_chapter = function(req, res) {
    //gets specific chapter
    const chapterId = req.params.chapter_id;
    pool.query('SELECT c.id, c.chapter_name, b.book_name FROM chapters c, books b WHERE c.book_id = b.id AND c.id = $1', [chapterId], (error, results) => {
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