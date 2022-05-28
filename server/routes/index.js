var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
//Using this for manual testing
router.get('/', function(req, res, next) {
  var boatslist = connection.query('SELECT * FROM boats', function (error, results, fields) {
    if (error) throw error;
    var boatsList = results;
    res.render('index', { title: 'Express', boats: boatsList});
  });

});

module.exports = router;
