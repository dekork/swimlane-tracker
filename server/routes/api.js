var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
//Using this for manual testing
router.get('/list', function(req, res, next) {
    var boatslist = connection.query('SELECT * FROM boats', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/addboat', function(req, res, next)
{
    var boat = req.body.boatname;
    var operator = req.body.operatorname;
    connection.query('INSERT INTO boats (vessel_name, operator_name, swimlane) VALUES (?,?,0)', [boat,operator], function(error, results){
        if (error) {
            res.sendStatus(400);
            return;
        }
        if (results.affectedRows == 0)
        {
           res.sendStatus(400);
           return;
        }
        res.sendStatus(200);
        });

});

module.exports = router;
