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
    //get specific book
    const userId = req.params.user_id

    pool.query('SELECT * FROM users WHERE id = $1', [userId], (error, results) => {
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
    const {name, email, userid} = req.body 
    pool.query('INSERT INTO users (name, email, userid) VALUES ($1, $2, $3)', [name, email, userid], (error, results) => {
        if (error) {
            throw(error)
        }
        res.status(201).send(`User added with ID: ${result.insertId}`)
    })
}