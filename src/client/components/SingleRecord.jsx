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

      if (response.data && response.data.order) {
        const orderId = response.data.order.id;

        console.log("Existing Order ID:", orderId); // Log the orderId

        await axios.post(`/api/orders/cart`, {
          orderId: orderId,
          recordId: record.id, 
          quantity: 1,
        });

        navigate("/cart");
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

          navigate("/cart"); 
        } else {
          console.error("Failed to create order for user.");
        }
      }
    } catch (err) {
      console.error("Error adding record to cart:", err);
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
          <Link to={`/cart/23`}>
            <button>View Cart</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SingleRecord;