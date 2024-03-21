const express = require("express");
const ordersRouter = express.Router();
const requireToken = require("./requireToken");
const {
  getAllOrders,
  createOrder,
  createCart,
  updateCartItem,
  getCartItems
  
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
  const { userId, orderDate, shippingAddress, status } = req.body;
  try {
    const order = await createOrder(userId, orderDate, shippingAddress, status);
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
ordersRouter.patch("/cart/:cartItemId", requireToken, async (req, res, next) => {
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
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

// Add more routes as needed

module.exports = ordersRouter;