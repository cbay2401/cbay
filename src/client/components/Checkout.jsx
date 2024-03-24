import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CheckoutForm() {
  const { cartId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    creditCardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Delete all items in the cart
      await axios.delete(`/api/orders/cart/${cartId}`);
      console.log('All items in the cart have been deleted successfully!');
    } catch (error) {
      console.error('Error deleting items from the cart:', error);
    }
    // You can handle form submission here, e.g., send other data to backend or perform validation
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Shipping Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="creditCardNumber">Credit Card Number:</label>
        <input
          type="text"
          id="creditCardNumber"
          name="creditCardNumber"
          value={formData.creditCardNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="text"
          id="expiryDate"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CheckoutForm;