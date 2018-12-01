var express = require('express');
var router = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');



var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'nada'
});
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");

    }});

router.locals.pretty = true;
router.use(express.static('public'));
router.set('view engine', 'ejs');
router.use(express.static('./views'));
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/cloud', function (req, res) {
    res.render('cloud');})
router.post('/cloud/post', function (req, res) {
    var put = req.body.put;
    var sql = `INSERT INTO cloud (cloud) VALUES (?)`;
    connection.query(sql, put, function (err, results) {
        res.redirect('/cloud/get');
    });
});

router.get('/cloud/get', function (req, res) {
    var sql = `SELECT cloud FROM cloud`;
    connection.query(sql, function (err, results) {
        res.render('result',{link:results});
    });
});

router.listen(80, function () {
    console.log('connect 80 port');
});
