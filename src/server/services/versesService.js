const VersesService = {
    getAllVerses(knex, limit=50, offset=0) {
        return knex('verses').select('*').limit(limit).offset(offset)
    },
    getById(knex, id) {
        return knex('verses').where('id', id)
    },
    getByChapterAndName(knex, chapter_id, name) {
        return knex('verses').where({
            chapter_id: chapter_id,
            verse_name: name
        }).first()
    }

}

module.exports = VersesService;