// server/db/users.js

const db = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({
  name = "first last",
  email,
  password,
  role = "user",
}) => {
  console.log("Role parameter received:", role);
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        INSERT INTO users(name, email, password, role)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`,
      [name, email, hashedPassword, role]
    );

    return user;
  } catch (err) {
    throw err;
  }
};

const getUser = async ({ email, password }) => {
  if (!email || !password) {
    return;
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    const { id, role, ...userData } = user;
    return { id, ...userData, role };
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        SELECT * 
        FROM users
        WHERE email=$1;`,
      [email]
    );

    if (!user) {
      return;
    }
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  console.log({ id });
  try {
    const result = await db.query({
      text: `SELECT users.id as user_id, users.name, users.email, users.role, orders.id as order_id
        FROM users
        JOIN orders ON  users.id=orders.user_id
        WHERE users.id= $1`,
      values: [id],
    });

    const [user] = result.rows;
    if (!user) {
      return;
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      order: {
        id: user.order_id,
      },
    };
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const { rows } = await db.query(`
    SELECT id, name, email, role
    FROM users
    `);

    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
};
