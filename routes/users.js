var express = require('express');
var user = require("../controllers/user.controller.js");
var router = express.Router();

// Create a new user
router.post("/", user.create);

// Retrieve all users
router.get("/", user.findAll);

// Retrieve all active users
router.get("/active", user.findAllActive);

// Retrieve a single user with id
router.get("/:id", user.findOne);

// Update a user with id
router.put("/:id", user.update);

// Delete a user with id
router.delete("/:id", user.delete);

// Delete all users
router.delete("/", user.deleteAll);

module.exports = router;
