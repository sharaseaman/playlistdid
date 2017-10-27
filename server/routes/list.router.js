var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


router.get('/getMyListsNames', function (req, res) {
    console.log('in getMyListsNames route');
    if (req.isAuthenticated()) {
        // console.log('logged in', req.user);        
        pool.connect(function (connectionError, client, done) {
            if (connectionError) {
                console.log(connectionError);
                res.sendStatus(500);
            } else {
                var queryString = 'SELECT * FROM users_lists JOIN list ON list.list_id=users_lists.list_id WHERE users_id=$1;';
                var values = [req.user.id];

                client.query(queryString, values, function (queryError, resultObj) {
                    done();
                    if (queryError) {
                        console.log(queryError);
                        res.sendStatus(501);
                    } else {
                        res.send(resultObj.rows);
                        console.log('get my listnames return from db', resultObj.rows);

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

// DONE //

router.get('/:myListName', function (req, res) {
    console.log('in router/get on list route');
    if (req.isAuthenticated()) {
        // console.log('logged in', req.user);
        var myListName = { listname: req.params.myListName };

        pool.connect(function (connectionError, client, done) {
            if (connectionError) {
                console.log(connectionError);
                res.sendStatus(500);
            } else {
                var queryString = 'SELECT * FROM items INNER JOIN list ON items.list_id=list.list_id WHERE list.listname=$1';

                var insertArray = [myListName.listname]
                client.query(queryString, insertArray, function (queryError, resultObj) {
                    done();
                    if (queryError) {
                        console.log(queryError);
                        res.sendStatus(501);
                    } else {
                        console.log('list router resultObj.rows', resultObj.rows);
                        res.send(resultObj.rows);
                        console.log('getMyList return from db', resultObj.rows);

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

//code for true false checks
router.put('/', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (connectionError, client, done) {
            console.log('req.body ->', req.body);
            var flower = req.body;

            if (connectionError) {
                console.log(connectionError);
                res.sendStatus(501);
            } else {
                // console.log('i am here');

                var pQuery = 'SELECT items_id FROM items WHERE itemname=$1';
               
                var valueArray = [flower.data];

                client.query(pQuery, valueArray, function (queryError, resultObj) {
                    done();
                     console.log('this is reusltObj',resultObj.rows[0].items_id);

                    if (queryError) {
                        console.log(queryError);
                        res.sendStatus(501);
                    } else {
                        var pQuery2 = 'UPDATE items SET checkbox=$2 WHERE items_id=$1';

                        var valueArray2 = [resultObj.rows[0].items_id, flower.complete];
                        client.query(pQuery2, valueArray2, function (queryError, resultObj) {
                            done();
                            if (queryError) {
                                console.log(queryError);
                                res.sendStatus(500);
                            } else {
                                // console.log('yaaaaaay', resultObj);
                                res.sendStatus(202);
                            }
                        });
                    };
                })
            }

        });
    }
    else {
        console.log('not logged in');
        res.send(false);
    }
});//end put route

module.exports = router;
