import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
      const userId = response.data.userId;
      localStorage.setItem("userId", userId);
      const userRole = response.data.role;

      if (userRole === "admin") {
        navigate("/users/account");
      } else {
        await createOrderForUser(userId);
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
      });
    } catch (error) {
      console.error("Error creating order for user:", error.message);
    }
  }
  return (
    <div className="login-form">
      <h2 className="login-text">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="textfield-all">
          <TextField
            className="textfield"
            size="small"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="textfield-all">
          <TextField
            className="textfield"
            size="small"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};
export default LoginForm;
