const db = require("./client");

async function getAllOrders() {
  try {
    const { rows } = await db.query('SELECT * FROM orders');
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createOrder(userId, orderDate, shippingAddress, status) {
  try {
    const { rows } = await db.query(
      `INSERT INTO orders (user_id, orderdate, shippingaddress, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, orderDate, shippingAddress, status]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getAllOrders,
  createOrder,
};