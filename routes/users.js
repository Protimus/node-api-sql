var express = require('express');
var user = require("../controllers/user.controller.js");
const { authJwt } = require('../middlewares');
var router = express.Router();

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Create a new user
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], user.create);

// Retrieve all users
router.get("/", [authJwt.verifyToken], user.findAll);

// Retrieve all active users
router.get("/active", [authJwt.verifyToken], user.findAllActive);

// Retrieve a single user with id
router.get("/:id", [authJwt.verifyToken], user.findOne);

// Update a user with id
router.put("/:id", [authJwt.verifyToken], user.update);

// Delete a user with id
router.delete("/:id", [authJwt.verifyToken], user.delete);

// Delete all users
router.delete("/", [authJwt.verifyToken], user.deleteAll);

module.exports = router;
