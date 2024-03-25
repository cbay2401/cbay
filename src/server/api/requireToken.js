// server/api/requireToken.js

const jwt = require('jsonwebtoken')

const requireToken = async (req, res, next) => {
  try {
    const payload = jwt.verify(req.headers.authorization.replace('Bearer ', ''), process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch(error) {
    console.error(error.stack);
    res.status(401).send('not logged in');
  }
};

module.exports = requireToken;