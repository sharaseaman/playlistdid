var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        var userInfo = {
            username: req.user.username,
            usersid: req.user.id
        };
        res.send(userInfo);
    } else {
        res.send(false);
    }
});
//DONE
router.get('/allListsName', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (connectionError, client, done) {
            if (connectionError) {
                console.log(connectionError);
                res.sendStatus(500);
            } else {
                var queryString = 'SELECT * FROM list';

                client.query(queryString, function (queryError, resultObj) {
                    done();
                    if (queryError) {
                        console.log(queryError);
                        res.sendStatus(501);
                    } else {
                        res.send(resultObj.rows);
                    }
                })
            }
        })
    }
    else {
        console.log('not logged in');
        res.send(false);

    }
});

//DONE 
router.get('/getThisListItems/:listName', function (req, res) {
    if (req.isAuthenticated()) {
        var listName = { listname: req.params.listName };
        pool.connect(function (connectionError, client, done) {
            if (connectionError) {
                console.log(connectionError);
                res.sendStatus(500);
            } else {
                var queryString = 'SELECT * FROM items INNER JOIN list ON items.list_id=list.list_id WHERE list.listname=$1';
                var stars = [listName.listname]
                client.query(queryString, stars, function (queryError, resultObj) {
                    done();
                    if (queryError) {
                        console.log(queryError);
                        res.sendStatus(501);
                    } else {
                        res.send(resultObj.rows);
                    }
                })
            }
        })
    }
    else {
        console.log('not logged in');
        res.send(false);

    }
});

// in progress
// on save click, add that list and items to logged in user
router.post('/', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('post request to add list to user');
        pool.connect(function (connectionError, client, done) {
              
                console.log('req.body is this', req.body);
                
                // console.log('req.body equasdfosls ->', req.body.data[0].list_id);
                
                var list_id=req.body.data;
                console.log('req.user', req.user.id);            
                
                console.log('this is toDo.item', list_id);

                if (connectionError) {
                    console.log(connectionError);
                    res.sendStatus(501);
                } else {
                    var pQuery = 'INSERT INTO users_lists (list_id,users_id) VALUES ($1,$2);'; 
                    var listname = [req.body.data,req.user.id];

                    // // var toDoArray = [toDo.listName, toDo.item,toDo.userId ];

                    client.query(pQuery, listname, function (queryError, resultObj) {
                        done();
                        if (queryError) {
                            console.log(queryError);
                            res.sendStatus(500);
                        } else {
                            console.log('yaaaaaay');
                        }
                    });
                }
            })
    } else {
        console.log('not logged in');
        res.send(false);
    }
});

router.get('/logout', function (req, res) {
    req.logOut();
    res.sendStatus(200);
});



module.exports = router;
