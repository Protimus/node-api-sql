var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node REST API using SQL created by Rafael P C Gorges (Protimus)' });
});

module.exports = router;
