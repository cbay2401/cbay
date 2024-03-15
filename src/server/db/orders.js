const db = require('./client')

async function addNewOrder(order) {
    const { user_id, orderdate, shippingaddress, status} = order

    const {rows}  = await db.query(
        `INSERT INTO orders (user_id REFERENCES users(id), orderdate, shippingaddress, status) 
        VALUES ($1,$2,$3,$4,$5,$6) 
        RETURNING *;`,[artist, albumname, year, genre, imageurl, price]
    )
     return rows [0];
}