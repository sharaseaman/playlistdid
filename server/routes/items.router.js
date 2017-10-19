// var express = require('express');
// var router = express.Router();
// var pool = require('../modules/pool.js');


// router.get('/',function(req,res){
//     console.log('in router/get on list route');
//     pool.connect(function(connectionError, client, done){
//         if(connectionError) {
//             console.log(connectionError);
//             res.sendStatus(500);
//         } else {
//             client.query('SELECT * FROM items WHERE list_id = 1', function(queryError, resultObj){
//                 done();
//                 if(queryError) {
//                     console.log(queryError);
//                     res.sendStatus(500);
//                 } else {
//                     console.log('resultObj.rows', resultObj.rows);
//                     res.send(resultObj.rows);
//                 }
//             })
//         }
//     })
// });

// module.exports = router;

