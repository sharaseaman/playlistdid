var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


router.get('/',function(req,res){
    console.log('in router/get on list route');
    pool.connect(function(connectionError, client, done){
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            client.query('SELECT list.name, array_agg(items.item) AS items, array_agg(items.complete)AS checkboxs FROM list INNER JOIN items ON items.list_id=list.id GROUP BY list.name;', function(queryError, resultObj){
                done();
                if(queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    console.log('list router resultObj.rows', resultObj.rows);
                    res.send(resultObj.rows);
                }
            })
        }
    })
});


router.put('/', function (req, res) {
    pool.connect(function (connectionError, client, done) {
        console.log('req.body ->', req.body.data);
        var flower = req.body.data;

        if (connectionError) {
            console.log(connectionError);
            res.sendStatus(501);
        } else {
            var pQuery = "UPDATE items SET complete=$1 WHERE item=$2";
            console.log('pQuery', pQuery);
            
            var valueArray = [flower.complete, flower.item];
            client.query(pQuery, valueArray, function (queryError, resultObj) {
                done();
                if (queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    console.log('yaaaaaay');
                    res.sendStatus(202);
                }
            });
        }
    })


});//end put route
module.exports = router;
