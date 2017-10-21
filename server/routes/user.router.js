var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    console.log('req.user', req.user);
    var userInfo = {
      username: req.user.username,
       usersid: req.user.id
    };
    console.log('user info inside user route sending back to service', userInfo)    
    res.send(userInfo);
  } else {
    res.send(false);
  }
});

router.get('/allLists',function(req,res){
  console.log('in router/get on list route');
  if(req.isAuthenticated()){
      console.log('logged in', req.user);
  pool.connect(function(connectionError, client, done){
      if(connectionError) {
          console.log(connectionError);
          res.sendStatus(500);
      } else {
          var queryString = 'SELECT list.name, array_agg(items.item)AS item FROM list INNER JOIN items ON items.list_id=list.id GROUP BY list.name';
          // var values = [req.user.id];
          
          client.query(queryString, function(queryError, resultObj){
              done();
              if(queryError) {
                  console.log(queryError);
                  res.sendStatus(501);
              } else {
                  console.log('list router resultObj.rows', resultObj.rows);
                  res.send(resultObj.rows);
              }
          })
      }
  })
  }
  else{
      console.log('not logged in');
      res.send(false);
      
  }
});

router.get('/logout', function (req, res) {
  req.logOut();
  res.sendStatus(200);
});



module.exports = router;
