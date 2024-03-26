const express = require("express");
const ordersRouter = express.Router();
const {
  getAllOrders,
  createOrder,
  createCart,
  updateCartItem,
  getCartItems,
  deleteCartItem,
  deleteAllCartItems,
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
  const { userId } = req.body;
  try {
    const order = await createOrder(userId);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/cart", async (req, res, next) => {
  const { orderId, recordId, quantity } = req.body;
  try {
    const cartItem = await createCart(orderId, recordId, quantity);
    res.status(201).json(cartItem);
  } catch (error) {
    next(error);
  }
});

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

ordersRouter.delete("/cart/ck/:orderId", async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const result = await deleteAllCartItems(orderId);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No items found for deletion." });
    }
    res.status(200).json({ message: "Cart items deleted successfully." });
  } catch (error) {
    console.error("Error deleting cart items:", error);
    next(error);
  }
});

module.exports = ordersRouter;

