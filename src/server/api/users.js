const express = require("express");
const usersRouter = express.Router();
const requireToken = require("./requireToken");

const { createUser, getUser, getUserByEmail, getUserById } = require("../db");

const jwt = require("jsonwebtoken");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const user = await getUser({ email, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        message: "Login successful, Cool dude!",
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    }

    const user = await createUser({
      name,
      email,
      password,
    });
console.log(process.env.JWT_SECRET)
    const token = jwt.sign(
      {
        id: user.id,
        email,
        password
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Sign up successful!",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/account", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await getUserById(id);
    if (!user) {
      res.status(404).send("No user found");
    } else {
      console.log('send that user', user)
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
});

// usersRouter.get("/orders", require("./orders"));
usersRouter.use("/orders", require("./orders"));

// usersRouter.post("/orders", require("./orders"));

module.exports = usersRouter;
