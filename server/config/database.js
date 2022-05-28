var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'swimlane',
    password : 'passw0rd',
    database : 'swimlane'
});
module.exports = connection;