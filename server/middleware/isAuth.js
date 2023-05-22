
// Require json web token 

const jwt = require('jsonwebtoken')

const User = require("../models/user")


// isAuth
const isAuth = async (req, res, next) => {
    try {
      const token = req.headers.authorization 
      if (!token) {
          res.status(400).send({ message: 'not authorized token' })
      }
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
      const foundUser = await User.findOne({_id: decodedToken.id})
      if (!foundUser) {
          res.status(400).send({ message: 'not authorized user' })
      }
      req.user = foundUser
      next();
    } catch (error) {
      return res.status(400).send({ message: 'Authentication failed' })
    }
  };

  module.exports = isAuth;