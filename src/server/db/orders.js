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
      [(order_Id, records_Id, quantity)]
    );
    return rows[0];
  } catch (err) {
    throw error;
  }
}

async function updateOrder(order_Id, updates){

  const {status, shippingAddress} = updates 
  try{
    const {rows} =  await db.query
    (`UPDATE orders SET status=$1 ,shippingaddress=$2 WHERE id= $3 RETURNING *`,
    [status, shippingAddress, order_Id])
    return rows[0];
  }catch (err){
    console.log("Error in updating the Order")
    throw err
  }
}

module.exports = {
  getAllOrders,
  createOrder,
  createCart,
  updateOrder
};
