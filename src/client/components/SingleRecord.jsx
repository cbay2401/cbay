// components/SingleRecord.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

function SingleRecord() {
  const { id } = useParams();
  const [record, setRecord] = useState({});
  const navigate = useNavigate();

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
      await axios.post(`api/records/${id}`);
      alert("You Got It!");

      navigate("/cart");
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
    <Link to="/cart">
      <button>View Cart</button>
    </Link>
  </div>
</div>

    </>
  );
}

export default SingleRecord;
