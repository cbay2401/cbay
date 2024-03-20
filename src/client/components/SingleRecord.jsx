import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useParams} from 'react-router-dom'


function SingleRecord() {
  
  const { id } = useParams();
  const [record, setRecord] = useState({});

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
      await axios.post(`/api/orders/${id}`);
      alert("You Got It!");
      // Navigate to cart page
      history.push("/cart");
    } catch (err) {
      console.error("Error adding record to cart:", err);
    }
  };

  return (
    <div className="single-record">
      <img className="albumcover" src={record.imageurl} alt="Album Cover" />
      <h1>{record.artist}</h1>
      <h2>{record.albumname}</h2>
      <p>${record.price}</p>
      <p>{record.year}</p>
      <p>{record.genre}</p>
      <button onClick={addToCart}>Add To Cart</button>
      <Link to="/cart">View Cart</Link>
    </div>
  );
}

export default SingleRecord;
