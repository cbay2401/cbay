const express = require("express");
const ordersRouter = express.Router();
const requireToken = require("./requireToken");
const {
  updateOrder,
  getAllOrders,
  createOrder,
  getCartOrderId,
  createCart,
} = require("../db/orders");

ordersRouter.get("/admin/orders", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/orders", async (req, res, next) => {
  const { userId, orderDate, shippingAddress, status } = req.body;
  try {
    const order = await createOrder(userId, orderDate, shippingAddress, status);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/cart", requireToken, async (req, res, next) => {
  const userId = req.user.id;
  const { recordId, quantity } = req.body;

  try {
    const isItemInCart = await checkItemInCart(userId, recordId, quantity);
    if (isItemInCart) {
      return res
        .status(409)
        .json({ message: "This item is already in your cart" });
    }

    const addedToCart = await createCart(userId, recordId, quantity);

    if (addedToCart) {
      return res
        .status(201)
        .json({ message: "Added to cart", cartItem: addedToCart });
    } else {
      throw new Error("Failed to add item to cart");
    }
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/cart/:orderId", requireToken, async (req, res, next) => {
  console.log("anything");
  const orderId = req.params.orderId;
  const update = req.body;

  try {
    const updatedOrder = await updateOrder(orderId, update);
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

//------- MAYBE UNNECESSARY CODE-------//
ordersRouter.post("/:orderId", requireToken, async (req, res, next) => {
  console.log("anything");
  const userId = req.user.id;
  const recordId = req.body;

  try {
    const updatedOrder = await updateOrder(userId, recordId);
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});



// Add more routes as needed

module.exports = ordersRouter;
