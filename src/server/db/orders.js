const db = require("./client");

async function getAllOrders() {
  try {
    const { rows } = await db.query("SELECT * FROM orders");
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

async function createCart(order_Id, records_Id, quantity) {
  try {
    const { rows } = await db.query(
      `INSERT INTO orders_records ( order_id, records_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [order_Id, records_Id, quantity]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
}

async function updateCartItem(cartItemId, quantity) {
  try {
    const { rows } = await db.query(
      `UPDATE orders_records SET quantity = $1 WHERE id = $2 RETURNING *`,
      [quantity, cartItemId]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function getCartItems(orderId) {
  try {
    const { rows } = await db.query(
      `
    SELECT * FROM orders_records WHERE order_id = $1
    `,
      [orderId]
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

async function addToCart(recordId) {
  try {
    const { rows } = await db.query(
      `INSERT recordId INTO orders_records WHERE id = $1
     `,
      [recordId]
    );

    if (!rows.length) {
      return "The Items In There!";
    } else {
      return rows;
    }
  } catch (err) {
    throw err;
  }
}

async function deleteCartItem(cartItemId) {
  try {
    const { rows } = await db.query(
      `DELETE FROM orders_records WHERE id = $1 RETURNING *`,
      [cartItemId]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function deleteAllCartItems(orderId) {
  try{
  await db.query(`
    DELETE FROM orders_records WHERE order_id = $1 RETURNING *`,
    [orderId])

  return rows;
} catch (error) {
  throw error
}
}

module.exports = {
  getAllOrders,
  createOrder,
  createCart,
  updateCartItem,
  getCartItems,
  addToCart,
  deleteCartItem,
  deleteAllCartItems
};
