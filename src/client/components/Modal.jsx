import React from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ message }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
};

export default Modal;