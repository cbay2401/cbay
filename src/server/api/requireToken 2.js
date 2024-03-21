// const jwt = require('jsonwebtoken')
// const { getUserById } = require('../db/users')

// const requireToken = async (req, res, next) => {
//   try {
//     // Verify the user is logged in, otherwise throw an error
//     const payload = jwt.verify(req.headers.authorization, process.env.JWT)

//     // Find the user data in the database
//     const user = await getUserById(payload.id)

//     // Add the user data to the `req` object for easy reference in our routes
//     req.user = user

//     // next() means we are not done processing the request - on to our route code!
//     next()
//   } catch(error) {
//     console.error(error.stack);
//     res.status(401).send('not logged in');
//   }
// };

// module.exports = requireToken;
