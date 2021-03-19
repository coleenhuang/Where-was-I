const chaptersService = {
    getAllChapters(knex) {
        return knex('chapters').select('*')
    },
    getById(knex, id) {
        return knex('chapters').where('id', id).first()
    },
    getByBookId(knex, book_id) {
        return knex('chapters').join('books', 'chapters.book_id', '=', 'books.id')
        .where('books.id', book_id)
        .select('chapters.id', 'chapters.chapter_name', 'chapters.num_of_verses','chapters.book_id', 'books.book_name')
    }
};

module.exports = chaptersService;