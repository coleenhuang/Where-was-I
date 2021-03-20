const UsersService = {
    getAllUsers(knex) {
        return knex('users').select('*')
    },
    getById(knex, id) {
        return knex('users').where('userid', id).first()
    }
}

module.exports = UsersService