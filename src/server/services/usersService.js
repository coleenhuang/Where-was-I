const UserService = {
    getAllUsers(knex) {
        return knex('users').select('*')
    },
    getById(knex, id) {
        return knex('users').where('userid', id)
    }
}