var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var request = require('request');

router.post('/', function (req, res, next) {
    if (req.isAuthenticated()) {
    }
    console.log('req.body = is here', req.body);
    console.log('what is next', next);
    
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        }
        client.query("INSERT INTO list (listname, category,user_id) VALUES ($1, $2, $3) RETURNING list_id;",
            [req.body.list, 'play', req.user.id],
            function (err, result) {
                // client.end();
                done();

                if (err) {
                    console.log("Error inserting data: ", err);
                    res.sendStatus(500);
                } else {
                    console.log('list_id mindblown = ', result.rows[0].list_id);
                    var obj1 = {
                        itemname: req.body.itemArray,
                        listid: result.rows[0].list_id
                    }
                    res.send(obj1);
                }
            });
    });
});

router.post('/insertItems', function (req, res, next) {
    console.log('insertItems working', req.body);
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        } else {
        client.query("INSERT INTO users_lists (users_id,list_id) VALUES ($2,$1);",
            [req.body.listid, req.user.id],
            function (err, result) {
                done();
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.sendStatus(500);
                } else {
                    for (var i = 0; i < req.body.itemname.length; i++) {
                                client.query("INSERT INTO items (itemname,list_id) VALUES ($1, $2);",
                                    [req.body.itemname[i].item, req.body.listid],
                                    function (err, result) {
                                        done();
                                        if (err) {
                                            console.log("Error inserting data: ", err);
                                            res.sendStatus(500);
                                        } else {
                                        }
                                    });
                                } 
                }
            });
        } 
        res.send(req.body);
    }); //end of pool connect
}); //end route

router.post('/favorites',function(req, res, next){
    console.log('in favorites create router',req.body);
    
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        }
        client.query("INSERT INTO users_lists (users_id, list_id)values($1, $2);",
            [req.user.id, req.body.listid],
            function (err, result) {
                done();
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.sendStatus(500);
                } else {
                }
            }); 
        res.send(req.body);
        
    });
});
module.exports = router;
