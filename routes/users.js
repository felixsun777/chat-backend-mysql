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

/* GET an user. */
router.get('/', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    username = req.query.username;
    password = req.query.password;

    //get users from db and judge the password
    sql = 'select password from users where username="' + username + '"';
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            throw err;
        }
        if (rows == ""){
            res.jsonp({'result':'no such user'});
        }else{
            realpassword = rows[0].password;
            if(password == realpassword){
                res.jsonp({'result':'ok'});
            }else{
                res.jsonp({'result':'incorrect password'});
            }
        }
    })
});

module.exports = router;
