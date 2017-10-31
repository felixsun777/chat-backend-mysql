var express = require('express');
var router = express.Router();
// var MongoClient = require('mongodb').MongoClient;
// var collection;
var mysql = require('mysql');

// Connect to the mysql db
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'chat'
});

// Connect to the mongodb
// MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
//     if(err) { return console.dir(err); }
//     collection = db.collection('messages');
// });

/* response to get method. */
router.get('/', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // collection.insert(message2);
    // collection.find({}).toArray(function(err, docs) {
    //     if(err) { return console.dir(err); }
    //     res.jsonp(docs);
    // });

    //get messages from mysql
    connection.query('SELECT * from message', function (err, rows, fields) {
        if (err) {
            throw err;
        }
        res.jsonp(rows);
    })
});

/* response to options method. */
//allow cross origin requests
router.options('/', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Content-Type");
    res.jsonp({'result':'ok'});
});

/* response to post method. */
router.post('/', function(req, res, next) {

    //var body = req.body.substring(0,req.body.length()-5);
    //var body = Json.stringify(req.body);
    console.log(req.body);
    var message = req.body.message;
    var username = req.body.username;

    console.log(username);
    console.log(message);
    //collection.insert(message);

    //insert new message to mysql
    var sql = 'Insert into message (username,message) values ( "'+ username +'" , "'+ message +'")';
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
