const UsersService = {
    getAllUsers(knex) {
        return knex('users').select('*')
    },
    getById(knex, id) {
        return knex('users').where('userid', id).first()
    },
    addUser(knex, userid, email, username) {
        return knex('users').insert({userid, email, username}, ['userid'])
    }
}

module.exports = UsersService