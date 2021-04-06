const PlansService = {
    getByUserid(knex, user_id) {
        return knex('users').where('userid', user_id).first()
    }
}

module.exports = PlansService