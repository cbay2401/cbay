import React, { useState, useEffect } from 'react';
//import '.style.css'; // Import your CSS file for styling

const Slideshow = () => {
  const images = [
    'https://media.pitchfork.com/photos/6596f3a1cf7bb5fb106222ab/master/pass/Fiona-Apple.jpg5',
    'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-146432-6b725a8c7cad1a0414c5a33f06299e9d2730ae2e.jpg',
    'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Feliz_Cumplea%C3%B1os_Ferxxo_Te_Pirateamos_el_%C3%81lbum.jpg/220px-Feliz_Cumplea%C3%B1os_Ferxxo_Te_Pirateamos_el_%C3%81lbum.jpg',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={
            index === currentImageIndex ? 'slide active' : 'slide inactive'
          }
        >
          <img className='slide-images' src={image} alt={`Slide ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;