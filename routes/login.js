const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../database');

const router = express.Router();

// register route
router.post('/login', async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };

  await users.User.findOne({
    where: { username: data.username },
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(data.password, user.get('password'))
          .then((resp) => {
            if (resp) {
              // Create a new token with the username in the payload
              // and which expires 3600 seconds after issue
              const jwtToken = jwt.sign(data.username, process.env.JWT_KEY, {
                algorithm: 'HS256',
              });
              // SET JWT TOKEN EXPIRED TIME
              res.cookie('token', jwtToken, { maxAge: process.env.JWT_EXPIRE });
              res.status(200).json({
                token: jwtToken,
              });
            } else {
              res.status(401).json('Bad username and/or password');
            }
          });
      } else {
        res.status(401).json('Bad username and/or password');
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  // I DONT KNOW WHAT TO DO ABOUT THAT ... help
  return 0;
});

module.exports = router;
