const UsersService = require('../services/usersService')


exports.list_users = function (req, res, next) {
    //gets all users
    const knexInstance = req.app.get('db');
    UsersService.getAllUsers(knexInstance)
    .then(users => {
        res.json(users)
    })
    .catch(next)
}

exports.get_by_id = function (req, res, next) {
    //get specific user by userid
    const userId = req.params.user_id
    const knexInstance = req.app.get('db');
    UsersService.getById(knexInstance, userId)
    .then(users => {
        if(!users) {
            return res.status(404).json({
                error: { message: `User doesn't exist` }
              })
        }
        res.json(users)
    })
    .catch(next)
}

exports.create_user = function (req, res, next) {
    const knexInstance = req.app.get('db');
    const {username, email, userid} = req.body
    if( !userid || !email || !username) {
        res.status(404).json({
            error: {message: 'Please provide the username, email and userid'}
        })
        
    }

    UsersService.addUser(knexInstance, userid, email, username)
    .then(user => res.status(201).json(`user ${user[0]} added`))
    .catch(next)
}