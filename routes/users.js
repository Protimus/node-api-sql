var express = require('express');
var user = require("../controllers/user.controller.js");
var router = express.Router();
var jwt = require('jwt-simple'),
config = require('config');

var auth = function(request, response, next){
    var token = request.query.token;
    if(!token){
        var err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    try {
        var decoded = jwt.decode(token, config.get('jwtTokenSecret'));
        var isExpired = moment(decoded.exp).isBefore(new Date());
        if(isExpired){
            var err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        } else {
            request.user = decoded.user;
            next();
        }
    } catch(err){
        return next(err);
    }
};

// Create a new user
router.post("/", auth, user.create);

// Retrieve all users
router.get("/", auth, user.findAll);

// Retrieve all active users
router.get("/active", auth, user.findAllActive);

// Retrieve a single user with id
router.get("/:id", auth, user.findOne);

// Update a user with id
router.put("/:id", auth, user.update);

// Delete a user with id
router.delete("/:id", auth, user.delete);

// Delete all users
router.delete("/", auth, user.deleteAll);

module.exports = router;
