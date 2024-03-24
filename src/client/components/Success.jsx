import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>Thank you for your purchase!</h1>
      <p>You will be redirected to the homepage in 5 seconds...</p>
    </div>
  );
};

export default Success;
