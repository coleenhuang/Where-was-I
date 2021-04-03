const VersesService = {
    getAllVerses(knex, limit=50, offset=0) {
        return knex.select('*').from('verses').limit(limit).offset(offset)
    },
    getById(knex, id) {
        return knex('verses').where('id', id).first()
    },
    getByChapterAndName(knex, chapter_id, name) {
        return knex('verses').where({
            chapter_id: chapter_id,
            verse_name: name
        }).first()
    },
    getByChapter(knex, chapter_id){
        return knex('verses').where('chapter_id', chapter_id)
    },
    getByBook(knex, book_id, limit=50, offset=0) {
        return knex('verses').join('chapters', 'verses.chapter_id', '=', 'chapters.id')
        .where('chapters.book_id', book_id)
        .select('verses.id', 'verses.verse_name', 'verses.chapter_id', 'chapters.book_id')
        .limit(limit).offset(offset)
    }

}

module.exports = VersesService;