const express = require('express');
const moment = require('moment');
const bcrypt = require('bcrypt');
const users = require('../database');

const { validateRegister } = require('../models/user');

const router = express.Router();

// register route
router.post('/register', async (req, res) => {
  const { error } = validateRegister(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const data = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };

  // Check if this user already exisits
  await users.User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user != null) {
        res.status(400).json('That user already exists !');
      } else {
        bcrypt.hash(data.password, 12)
          .then((cryptedPassword) => {
            users.User.create({
              username: req.body.username,
              password: cryptedPassword,
              email: req.body.email,
              createdAt: moment().format(),
              updatedAt: moment().format(),
              enabled: 1,
            });
          })
          .then(() => {
            res.status(201).json('User created');
          });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });

  // I DONT KNOW WHAT TO DO ABOUT THAT ... help
  return 0;
});

module.exports = router;
