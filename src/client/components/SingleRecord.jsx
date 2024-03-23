import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

function SingleRecord() {
  const { id } = useParams(); 
  const [record, setRecord] = useState({});
  const navigate = useNavigate();
  const {cartId} = useParams()

  useEffect(() => {
    async function getRecord() {
      try {
        const { data } = await axios.get(`/api/records/${id}`);
        setRecord(data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
    getRecord();
  }, [id]);

  const addToCart = async () => {
    try {
      const userId = localStorage.getItem('userId');

      console.log("User ID:", userId); // Log the userId

      
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("User is not logged in");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/api/users/account`, config);

      console.log("User Account Response:", response.data); // Log the response data
console.log("response!!", response)
      if (response.data && response.data.order.id) {
        const orderId = response.data.order.id;
        

        console.log("Existing Order ID:", orderId); // Log the orderId

        await axios.post(`/api/orders/cart`, {
          orderId: orderId,
          recordId: record.id, 
          quantity: 1,
        });

        // navigate(`/cart/${cartId}`);
      } else {
        console.log("Creating new order...");

        const orderResponse = await axios.post(`/api/orders`, {
          userId: userId,
        });
        console.log("New Order Response:", orderResponse.data);

        if (orderResponse.data && orderResponse.data.id) {

          const orderId = orderResponse.data.id;
          console.log("New Order ID:", orderId);

          await axios.post(`/api/orders/cart`, {
            orderId: orderId,
            recordId: record.id,
            quantity: 1,
          });

          navigate(`/cart/${orderId}`); 
        } else {
          console.error("Failed to create order for user.");
        }
      }
    } catch (err) {
      console.error("Error adding record to cart:", err);
    }
  };

  const createNewOrder = async () => {
    try {
      const response = await axios.post("/api/orders", {
        // Assuming you handle user authentication and have the user ID available here
        orderDate: new Date().toISOString(),
        shippingAddress: "", // You might want to add the user's shipping address here
        status: "pending",
      });
      return response.data; // Assuming the response contains the newly created order data
    } catch (err) {
      console.error("Error creating new order:", err);
      throw err; // Rethrow the error to handle it in the calling function if needed
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
          <Link to={`/cart/${cartId}`}>
            <button>View Cart</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SingleRecord;