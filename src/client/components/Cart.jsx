import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [recordDetails, setRecordDetails] = useState({});
  const navigate = useNavigate();
  const { cartId } = useParams();

  useEffect(() => {
    async function fetchCartItems() {
      try {
        if (cartId) {
          const { data } = await axios.get(`/api/orders/cart/${cartId}`);
          setCartItems(data);

          data.forEach(async (item) => {
            const recordData = await fetchRecordDetails(item.records_id);
            setRecordDetails((prevState) => ({
              ...prevState,
              [item.records_id]: recordData,
            }));
          });
        }
      } catch (error) {
        console.error("ERROR IN CART.JSX LINE 28", error);
      }
    }

    fetchCartItems();
  }, [cartId]);

  const fetchRecordDetails = async (recordId) => {
    try {
      const { data } = await axios.get(`/api/records/${recordId}`);
      return data;
    } catch (error) {
      console.error(
        `Error fetching record details for record ID ${recordId}:`,
        error
      );
      return {};
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`/api/orders/cart/${cartItemId}`);
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== cartItemId)
      );
      alert("Record removed from cart successfully!");
    } catch (error) {
      console.error("Error removing record from cart:", error);
    }
  };

  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    try {
      await axios.patch(`/api/orders/cart/${cartItemId}`, {
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    updateCartItemQuantity(
      itemId,
      cartItems.find((item) => item.id === itemId).quantity + 1
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    updateCartItemQuantity(
      itemId,
      cartItems.find((item) => item.id === itemId).quantity - 1
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + (item.quantity * recordDetails[item.records_id]?.price || 0),
    0
  );

  return (
    <>
      <h1 className="shoppingCartH1">Cart</h1>

      <div className="cart">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="album-container">
                    {recordDetails[item.records_id] && (
                      <>
                        <img
                          className="albumcover"
                          src={recordDetails[item.records_id].imageurl}
                          alt="Album Cover"
                        />
                        <div className="item-details">
                          <h3>{recordDetails[item.records_id].albumname}</h3>
                          <h4>${recordDetails[item.records_id].price}</h4>
                          <div className="quantity-controls">
                            <button onClick={() => decreaseQuantity(item.id)}>
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateCartItemQuantity(item.id, e.target.value)
                              }
                            />
                            <button onClick={() => increaseQuantity(item.id)}>
                              +
                            </button>
                          </div>
                          <button
                            className="remove-button"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <h2 className="total-price">
              Total Price: ${totalPrice.toFixed(2)}
            </h2>
          </>
        )}
        <button
          className="remove-button"
          onClick={() => navigate(`/checkout/${cartId}`)}
        >
          Checkout
        </button>
        <button className="remove-button" onClick={() => navigate("/records")}>
          Shop
        </button>
      </div>
    </>
  );
}

export default Cart;
