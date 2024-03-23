import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("jwtToken", token);
      setToken(token);

      // localStorage.setItem(token)

      console.log("login Successful, Dude!", response);

      const userId = response.data.userId;
      localStorage.setItem("userId", userId);
      console.log("firstBlah:", userId)
      const userRole = response.data.role;
      console.log("User role:", userRole);

      if (userRole === "admin") {

        navigate("/users/account");
      } else {
        await createOrderForUser(userId);
        console.log("Blah",userId)

        navigate("/users/account");
      }
    } catch (err) {
      console.error("Error in login ", err.message);
      setMessage("Invalid email or password. Please try again.");
    }
  }

  async function createOrderForUser(userId) {
    try {
      await axios.post("http://localhost:3000/api/orders", {
        userId: userId,
        // You may include other order details here
      });
    } catch (error) {
      console.error("Error creating order for user:", error.message);
    }
  }

  return (
    <div className="login-form">
      <h2 className="login-text">Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default LoginForm;