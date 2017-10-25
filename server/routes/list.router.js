var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


router.get('/', function (req, res) {
    console.log('in router/get on list route');
    if (req.isAuthenticated()) {
        console.log('logged in', req.user);
        pool.connect(function (connectionError, client, done) {
            if (connectionError) {
                console.log(connectionError);
                res.sendStatus(500);
            } else {
                var queryString = 'SELECT * FROM  items INNER JOIN list ON items.list_id=list.list_id INNER JOIN users_lists on list.list_id=users_lists.list_id;';
                // var values = [req.user.id];

                client.query(queryString, function (queryError, resultObj) {
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


router.put('/', function (req, res) {
    pool.connect(function (connectionError, client, done) {
        console.log('req.body ->', req.body);
        var flower = req.body;

        if (connectionError) {
            console.log(connectionError);
            res.sendStatus(501);
        } else {
            var pQuery = 'SELECT id FROM items WHERE item = $1';

            console.log('pQuery', pQuery);

            var valueArray = [flower.data];
            client.query(pQuery, valueArray, function (queryError, resultObj) {
                done();
                if (queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    console.log('yaaaaaay', resultObj);
                    var pQuery2 = 'UPDATE user_items SET complete=$3 WHERE items_id=$1 AND users_id=$2';
                    console.log('pQuery', pQuery);

                    var valueArray2 = [resultObj.rows[0].id, req.user.id, flower.complete];
                    client.query(pQuery2, valueArray2, function (queryError, resultObj) {
                        done();
                        if (queryError) {
                            console.log(queryError);
                            res.sendStatus(500);
                        } else {
                            console.log('yaaaaaay', resultObj);
                            res.sendStatus(202);
                        }
                    })
            };
        })
    }

    })
});//end put route






module.exports = router;
