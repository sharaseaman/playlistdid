var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var request = require('request');

router.post('/', function (req, res, next) {
    console.log('req.body',req.body);
    
    var newList = {
        name: req.body.name,
        item: [req.body.item]
    };
    console.log('router newList', newList.name);
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        }
        client.query("INSERT INTO list (name) VALUES ($1)",
            [newList.name],
            function (err, result) {
                client.end();
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
    });
});



module.exports = router;
