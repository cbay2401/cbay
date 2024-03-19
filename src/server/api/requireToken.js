const jwt = require('jsonwebtoken')

const requireToken = async (req, res, next) => {
  try {
    // Verify the user is logged in, otherwise throw an error)
    const payload = jwt.verify(req.headers.authorization.replace('Bearer ', ''), process.env.JWT_SECRET)

    // Add the user data to the `req` object for easy reference in our routes
    req.user = payload

    // next() means we are not done processing the request - on to our route code!
    next()
  } catch(error) {
    console.error(error.stack);
    res.status(401).send('not logged in');
  }
};

module.exports = requireToken;