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

/* response to get method. */
router.get('/', function(req, res, next) {

    var user_initiate = req.query.user_initiate;
    var user_finish = req.query.user_finish;

    res.setHeader("Access-Control-Allow-Origin", "*");

    //get messages from mysql
    sql = 'select user_initiate,user_finish,message from message where (user_initiate = "'+ user_initiate +'" and user_finish = "'+ user_finish +'") ' +
    'or (user_initiate = "'+ user_finish +'" and user_finish = "'+ user_initiate +'") order by mno;'
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            throw err;
        }
        res.jsonp(rows);
    })
});

/* response to options method. */
//allow cross origin requests
router.options('/', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Content-Type");
    res.jsonp({'result':'ok'});
});

/* response to post method. */
router.post('/', function(req, res, next) {

    console.log(req.body);
    var message = req.body.message;
    var user_initiate = req.body.user_initiate;
    var user_finish = req.body.user_finish;

    //insert new message to mysql
    var sql = 'Insert into message (user_initiate,user_finish,message) values ( "'+ user_initiate +'" , "'+ user_finish +'" , "'+ message +'")';
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.jsonp('failed');
            throw err;
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.jsonp({'result':'ok'});
    })

});

module.exports = router;
