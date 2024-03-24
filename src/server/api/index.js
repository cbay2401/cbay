// server/api/index.js

const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env


const volleyball = require('volleyball')
apiRouter.use(volleyball)


apiRouter.get('/', (req,res)=>{
  res.send('In the /api routes, dude!')
})


apiRouter.get('/records', require ('./records'))
apiRouter.use('/records', require('./records'))

apiRouter.post('/records', require('./records'))

// apiRouter.get('/orders', require('./orders'))
// apiRouter.use('/orders', require('./orders'))

// apiRouter.post('/orders', require('./orders'))

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer "
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith(prefix)) {
    
    const token = auth.slice(prefix.length);
    
    try {
     
      const { email } = jwt.verify(token, JWT_SECRET)

      if (email) {
        req.user = await getUserByEmail(email)
        next()
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: `Authorization token malformed'`
        })
      }

    } catch (error) {
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});


// apiRouter.get('/orders', require('./orders'))
apiRouter.use('/orders', require('./orders'))

// apiRouter.post('/orders', require('./orders'))


const usersRouter = require('./users');
const { getUserByEmail } = require('../db');
apiRouter.use('/users', usersRouter);

apiRouter.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err)
  })

module.exports = apiRouter;
