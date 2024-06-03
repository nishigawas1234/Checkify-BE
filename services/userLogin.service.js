const models = require("../models");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

function signUp(req, res) {
  models.UserLogin.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists!",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          if (err) {
            return res.status(500).json({
              message: "Something went wrong!",
            });
          }
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            if (err) {
              return res.status(500).json({
                message: "Something went wrong!",
              });
            }
            const user = {
              name: req.body.name,
              email: req.body.email,
              passowrd: hash,
            };

            models.UserLogin.create(user)
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Something went wrong!",
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function login(req, res) {
  models.UserLogin.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials!",
        });
      } else {
        if (!req.body.password || !user.passowrd) {
          return res.status(500).json({
            message: "Something went wrong!",
          });
        }

        bcryptjs.compare(
          req.body.password,
          user.passowrd,
          function (err, result) {
            if (err) {
              return res.status(500).json({
                message: "Something went wrong!",
              });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                process.env.JWT_KEY,
                function (err, token) {
                  if (err) {
                    return res.status(500).json({
                      message: "Something went wrong!",
                    });
                  }
                  res.status(200).json({
                    message: "Authentication successful!",
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Invalid credentials!",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

module.exports = {
  signUp: signUp,
  login: login,
};
