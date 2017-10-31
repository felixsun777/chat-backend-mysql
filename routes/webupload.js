var express = require('express');
var multer = require('multer');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var collection;

// multers disk storage settings
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

//multer settings
var upload = multer({
    storage: storage
}).single('file');


// Connect to the db
MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
    if(err) { return console.dir(err); }
    collection = db.collection('messages');
});

/* response to options method. */
//allow cross origin requests
router.options('/', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    //res.setHeader("Access-Control-Allow-Origin", "http://localhost:8100");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin");
    res.jsonp({'result':'ok'});
});

/* response to post method and upload files. */
//allow cross origin requests
router.post('/', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    //res.setHeader("Access-Control-Allow-Origin", "http://localhost:8100");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin");

    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        //res.json({error_code:0,err_desc:null});
        res.jsonp({'result':'ok'});
    })
});


module.exports = router;
