var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// Connect to the mysql db
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'chat'
});

/* GET friends of the user. */
router.get('/', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    username = req.query.username;

    sql = 'select user_finish from friends where user_initiate="' + username + '"';
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            throw err;
        }
        res.jsonp(rows);
    })
});

module.exports = router;
