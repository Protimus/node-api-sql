var router = express.Router();
var express = require('express');
var paypalController = require("../controllers/paypal.controller.js");

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Create a new payment
router.get('/buy',  [authJwt.verifyToken, authJwt.isAdmin], paypalController.buy );

module.exports = router;