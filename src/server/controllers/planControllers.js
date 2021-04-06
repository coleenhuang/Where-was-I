const PlansService = require('../services/plansService')

exports.user_plans = function(req, res, next) {
    const knexInstance = req.app.get('db');
    const userId = req.params.user_id

    PlansService.getByUserid(knexInstance, userId)
    .then(plans => {
        res.json(plans)
    })
    .catch(next)
}

exports.add_entry = function(req, res, next) {
    const knexInstance = req.app.get('db');
    const {book_id, user_id} = req.body;
    
    if( !user_id || !book_id) {
        res.status(404).json({
            error: {message: 'Please provide the user_id and book_id'}
        }) 
    }
    PlansService.addBook(knexInstance, user_id, book_id)
    .then(plan => res.status(201).json(`book added to reading plan`))
    .catch(next)
}