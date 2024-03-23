// server/api/orders.js

const express = require("express");
const ordersRouter = express.Router();
const requireToken = require("./requireToken");
const {
  getAllOrders,
  createOrder,
  createCart,
  updateCartItem,
  getCartItems,
  deleteCartItem
  
} = require("../db/orders");

ordersRouter.get("/admin/orders", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  const { userId} = req.body;
  console.log("Received userId:", userId)
  try {
    const order = await createOrder(userId);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// Add item to cart
ordersRouter.post("/cart", async (req, res, next) => {
  const { orderId, recordId, quantity } = req.body;
  try {
    const cartItem = await createCart(orderId, recordId, quantity);
    res.status(201).json(cartItem);
  } catch (error) {
    next(error);
  }
});

// Update cart item quantity
ordersRouter.patch("/cart/:cartItemId", async (req, res, next) => {
  const cartItemId = req.params.cartItemId;
  const { quantity } = req.body;
  try {
    const updatedCartItem = await updateCartItem(cartItemId, quantity);
    res.json(updatedCartItem);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/cart/:cartId", async (req, res, next) => {
  const cartId = req.params.cartId;
  try {
    const cartItems = await getCartItems(cartId);
    console.log(cartId)
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});


ordersRouter.delete("/cart/:cartItemId", async (req, res, next) => {
  const cartItemId = req.params.cartItemId;
  try {
    await deleteCartItem(cartItemId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Export the ordersRouter
module.exports = ordersRouter;
// Add more routes as needed
