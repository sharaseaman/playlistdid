var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var request = require('request');



// request({
//     url: 'https://api.foursquare.com/v2/venues/search',
//     method: 'GET',
//     qs: {
//       client_id: process.env.CLIENT_ID,
//       client_secret: process.env.CLIENT_SECRET,
//       near: 'Minneapolis,MN',
//       query: 'brewery',
//       v: '20170801',
//       limit: 5
//     }
//   }, function(err, res, body) {
//     if (err) {
//       console.error(err);
//     } else {
//         // console.log('body is this', body);
//        var museum = JSON.parse(body);
//       console.log('convert', museum.response); 
//       // console.log('body print', body); 
//     }
//   });


module.exports = router;
