var express = require('express');
var router = express.Router();
var connection = require('../config/database');

// Lists all boats as JSON
router.get('/list', function(req, res, next) {
    var boatslist = connection.query('SELECT * FROM boats', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

// Adds a boat with default swimlane 0 (Docked)
//  Inputs: req.bodyboatname, req.body.operatorname -- **TODO: change this after building frontend
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
        res.send(results.insertId.toString());
        });

});

// Edit an existing boat Ex: /editboat/1
//  Input: id (via URL), req.body.boatname, req.body.operatorname
// TODO: add test
router.post('/editboat/:id', function(req, res) {
    var id = req.params.id;
    var vesselname = req.body.vesselname;
    var operator = req.body.operatorname;
    var swimlane = req.body.swimlane;
    connection.query('UPDATE boats' +
        'SET vessel_name=?, operator_name=?, swimlane=?' +
        'WHERE id = ?', [vesselname, operator, swimlane, id], function(error, results) {
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
