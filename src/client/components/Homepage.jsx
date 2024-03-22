import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Slideshow = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/records")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="home-container">
        <div className="slideshow-container">
          {images.map((image, index) => (
            <div
              key={index}
              className={
                index === currentImageIndex ? "slide active" : "slide inactive"
              }
            >
              <img
                className="slide-images"
                src={image.imageurl}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
          <div className="button-container">
            <button
              className="glow-on-hover"
              onClick={() => navigate("/records")}
            >
              See All Records
            </button>
          </div>
        </div>
        <div class="newsletter">
  <h1>Subscribe to Our Newsletter</h1>
  <h4>Stay up to date on new releases, sales, and in store events.</h4>
  <form>
    <input type="email" placeholder="Your Email Address"/>
    <button type="submit">Submit</button>
  </form>
  <br></br>
</div>



        

      </div>
    </>
  );
};

export default Slideshow;
