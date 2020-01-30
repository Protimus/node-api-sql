var express = require('express'),
jwt = require('jwt-simple'),
moment = require('moment'),
config = require('config'),
router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node REST API using SQL created by Rafael P C Gorges (Protimus)' });
});

/* POST Login Auth with JWT */
router.post('/login', function(request, response, next){
  var username = request.body.username;
  var password = request.body.password;
  if(username === 'protimus' && password === '123456'){
    var expires = moment().add(7, 'days').valueOf();
    var token = jwt.encode({
      user: username,
      exp: expires
    },
    config.get('jwtTokenSecret'));
    response.json({
      token: token
    });
  } else {
    var err = new Error('Unathorized');
    err.status = 401;
    next(err);
  }
});

module.exports = router;
