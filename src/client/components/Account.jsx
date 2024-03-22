
import React, { useState, useEffect } from "react";
import axios from "axios";

function AccountInfo({ token }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      console.log("new token log", token);
      try {
        const response = await axios.get(`/api/users/account`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response!", response)
        setUserData(response.data); // Set user data received from the API
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    console.log("token::::", token)
    if (token) {
      fetchUserData(); // Fetch user data only if token is present
    }

  }, [token]);
  console.log(userData);
  return (
    <div className="account-info">
      <h1 className="accountInfoH1">Account Information</h1>
      {userData ? (
        <div className="accountInfoCard">
          <h4 >ID: {userData.id}</h4>
          <h4 >Name: {userData.name}</h4>
          <h4 >Email: {userData.email}</h4>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AccountInfo;
