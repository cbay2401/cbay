// components/Register.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/users/Register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setToken(result.token);
        localStorage.setItem("jwtToken", result.token);
        setSuccessMessage("Registration successful! Please Login!");
        await createOrderForUser(result.id);
        navigate("/login");
      } else {
        setError(
          "User with this email already exists. Please use a different email."
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function createOrderForUser(userId) {
    try {
      await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });
    } catch (error) {
      console.error("Error creating order for user:", error.message);
    }
  }

  return (
    <>
      <main className="register">
        <h2 className="register-text">Register!</h2>
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Full Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label for="check">Show Password</label>
            <input
              id="check"
              type="checkbox"
              value={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
          </div>

          <button className="btn4" type="submit">
            Register
          </button>
        </form>
      </main>
    </>
  );
}

export default Register;
