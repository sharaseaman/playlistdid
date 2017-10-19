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
            client.query('SELECT list.name, array_agg(items.item) FROM list INNER JOIN items ON items.list_id=list.id GROUP BY list.name;', function(queryError, resultObj){
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

module.exports = router;
