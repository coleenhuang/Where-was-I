const VersesService = {
    getAllVerses(knex) {
        return knex('verses').select('*')
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