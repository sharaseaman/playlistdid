var express = require('express');
var app = express();
require('dotenv').config();
var request = require('request');

var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

var passport = require('./strategies/sql.localstrategy');
var sessionConfig = require('./modules/session.config');

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');
var listRouter = require('./routes/list.router');
var itemsRouter = require('./routes/items.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/lists', listRouter);
// app.use('/items', itemsRouter);


// Catch all bucket, must be last!
app.use('/', indexRouter);
///////New Code Below

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
//     //   console.log('convert', museum.response); add this line back
//       // console.log('body print', body); 
//     }
//   });


///////New Code Above

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
