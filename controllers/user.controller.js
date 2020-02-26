const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new user.
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    state: req.body.state ? req.body.state : false
  };

  // Save User in the database
  User.create(user).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user."
    });
  });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
  User.findAll({ where: condition }).then(data => { 
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users."
    });
  });
};

// Find a single user with an id.
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving User with id = " + id
    });
  });
};

// Update a user by the id in the request.
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "User was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update user with id = ${id}.`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating user with id = " + id
    });
  });
};

// Delete a user with the specified id in the request.
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "User was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete user with id = ${id}.`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete user with id = " + id
    });
  });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({ message: `${nums} users were deleted successfully!` });
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all users."
    });
  });
};

// Find all active users.
exports.findAllActive = (req, res) => {
  User.findAll({ where: { state: true } }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  });
};