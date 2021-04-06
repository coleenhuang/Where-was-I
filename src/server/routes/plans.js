var express = require('express');
var router = express.Router();

//FIXME: not implemented yet

router.get('/:user_id', function(req, res, next) {
    res.send('plan');
});

module.exports = router;