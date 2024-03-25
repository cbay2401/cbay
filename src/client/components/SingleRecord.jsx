import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

function SingleRecord() {
  const { id } = useParams();
  const [record, setRecord] = useState({});
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const [cartId, setCartId] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    async function getRecord() {
      try {
        const { data } = await axios.get(`/api/records/${id}`);
        setRecord(data);
      } catch (err) {
        console.error("Error fetching record:", err);
      }
    }

    async function getUserAccount() {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          throw new Error("Sorry, Not Logged In, Bud!");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`/api/users/account`, config);
        if (response.data && response.data.cartId) {
          setCartId(response.data.cartId);
        }
        if (response.data && response.data.order && response.data.order.id) {
          setOrderId(response.data.order.id); // Setting orderId
        }
      } catch (err) {
        console.error("Error fetching user account:", err);
      }
    }

    getRecord();
    getUserAccount();
  }, [id]);

  const addToCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        throw new Error("User is not logged in");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const userOrder = await axios.get(`/api/users/account`, config);

      if (userOrder.data && userOrder.data.order.id) {
        const orderId = userOrder.data.order.id;

        const stuffInCart = await axios.get(`/api/orders/cart/${orderId}`, {
          params: { cartId: cartId },
        });
        const existingCartItem = stuffInCart.data.find(
          (item) => item.records_id === record.id
        );

        if (existingCartItem) {
          await axios.patch(`/api/orders/cart/${existingCartItem.id}`, {
            quantity: existingCartItem.quantity + 1,
          });
        } else {
          await axios.post(`/api/orders/cart`, {
            orderId: orderId,
            recordId: record.id,
            quantity: 1,
          });
        }

        setMessage("This item has been added to your cart!");
      } else {
        const orderResponse = await axios.post(`/api/orders`, {
          userId: userId,
        });

        if (orderResponse.data && orderResponse.data.id) {
          const orderId = orderResponse.data.id;

          await axios.post(`/api/orders/cart`, {
            orderId: orderId,
            recordId: record.id,
            quantity: 1,
          });

          setMessage("Item added to cart successfully!");
        } else {
          throw new Error("Failed to create order for user.");
        }
      }
    } catch (err) {
      console.error("UH OH, NOPE:", err);
      setErrorMessage("Please log in to add items to your cart.");
    }
  };

  return (
    <>
      <div className="single-record">
        <div className="album-info">
          <img
            className="singleRecordAlbumCover"
            src={record.imageurl}
            alt="Album Cover"
          />
          <div className="single-record-info">
            <h1>{record.artist}</h1>
            <h2>{record.albumname}</h2>
            <h4>${record.price}</h4>
            <h4>{record.year}</h4>
            <h4>{record.genre}</h4>
          </div>
        </div>
        <div className="singleRecordButtons">
          <button onClick={addToCart}>Add To Cart</button>
          <Link to={`/cart/${orderId}`}>
            <button>View Cart</button>
          </Link>
          <Link to={"/records"}>
            <button>Shop</button>
          </Link>
          {message && <h3>{message}</h3>}
          {errorMessage && <h3>{errorMessage}</h3>}
        </div>
      </div>
    </>
  );
}

export default SingleRecord;
