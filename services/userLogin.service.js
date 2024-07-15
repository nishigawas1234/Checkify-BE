const models = require("../models");
const bcryptjs = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");

function signUp(req, res) {
  console.log(models,"models")
  models.User.findOne({ where: { email: req.body.email } })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({
          message: "Email already exists!",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          if (err) {
            console.error("Error generating salt:", err);
            return res.status(500).json({
              message: "Something went wrong!",
            });
          }
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            if (err) {
              console.error("Error hashing password:", err);
              return res.status(500).json({
                message: "Something went wrong!",
              });
            }
            const user = {
              uuid: uuidv4(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              
            };
            console.log("Generated UUID:", user.uuid); // Log generated UUID

            models.User.create(user)
              .then((createdUser) => {
                return res.status(201).json({
                  message: "User created successfully",
                  user: {
                    id: createdUser.id,
                    name: createdUser.name,
                    email: createdUser.email,
                  },
                });
              })
              .catch((error) => {
                console.error("Error creating user:", error);
                return res.status(500).json({
                  message: "Something went wrong!",
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      return res.status(500).json({
        message: "Something went wrong!",
      });
    });
}


function login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials!",
        });
      } else {
        if (!req.body.password || !user.password) {
          return res.status(500).json({
            message: "Something went wrong!",
          });
        }

        bcryptjs.compare(
          req.body.password,
          user.password,
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
                    user: {
                      id: user.id,
                      uuid: user.uuid,
                      name: user.name,
                      email: user.email,
                    },
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
