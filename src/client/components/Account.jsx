import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AccountInfo({ token }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(`/api/users/account`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data); // Set user data received from the API
        if (response.data.order && response.data.order.id) {
          setOrderId(response.data.order.id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    if (token) {
      fetchUserData(); // Fetch user data only if token is present
    }
  }, [token]);

  const handleAdminDashboard = () => {
    navigate("/admin");
  };

  const handleCartButton = () => {
    navigate(`/cart/${orderId}`);
  };

    const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUserData(null);
    if (userData && userData.email === "null@example.com") {
      try {
        // Delete the cart if the user is a guest
        axios.delete(`/api/orders/cart/ck/${orderId}`);
        console.log("Guest cart deleted successfully!");
      } catch (error) {
        console.error("Error deleting guest cart:", error);
      }
    }
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="account-info">
      <h1 className="accountInfoH1">Account Information</h1>
      {userData ? (
        <div className="accountInfoCard">
          {/* <h4>ID: {userData.id}</h4> */}
          <h4>Name: {userData.name}</h4>
          <h4>Email: {userData.email}</h4>
          {userData.role === "admin" && (
            <button className="admin-btn" onClick={handleAdminDashboard}>Admin Dashboard</button>
          )}
          <button className="log-btn"  onClick={handleLogout}>Log Out</button>
          <button className="see-cart" onClick={handleCartButton}>See Cart</button>
        </div>
      ) : (
        <p>Please log in to see account information.</p>
      )}
    </div>
  );
}

export default AccountInfo;
