var express = require('express');
var router = express.Router();

//FIXME: not implemented yet

router.get('/', function(req, res, next) {
    res.send('read');
});

module.exports = router;