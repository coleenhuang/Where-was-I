const { pool } = require('../config');

exports.user_list = function (req, res) {
    //gets all users
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw(error)
        }
        res.status(200).json(results.rows)
    })
}

exports.specific_user = function (req, res) {
    //get specific user
    const userId = req.params.user_id

    pool.query('SELECT * FROM users WHERE userid = $1', [userId], (error, results) => {
        if (error) {
            throw(error)
        }
        if (results.rows.length <= 0) {
            return res.status(404).json({
                error: { message: `User doesn't exist` }
              })
        }
        res.status(200).json(results.rows)
    })
}

exports.create_user = function (req, res) {
    const {username, email, userid} = req.body
    if( !username) {
        res.status(404).json({
            error: {message: 'Please provide the username, email and userid'}
        })
    }
    else if( !email ) {
        res.status(404).json({
            error: {message: 'Please provide the username, email and userid'}
        })
    }
    else if( !userid) {
        res.status(404).json({
            error: {message: 'Please provide the userid'}
        })
    }
    pool.query('INSERT INTO users (username, email, userid) VALUES ($1, $2, $3)', [username, email, userid], (error, result) => {
        if (error) {
            throw(error)
        }
        res.status(201).send(`User added`)
    })
}