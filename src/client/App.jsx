import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/Login";
import AllRecords from "./components/AllRecords";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import SingleRecord from "./components/SingleRecord";
import AccountInfo from "./components/Account";
import Cart from "./components/Cart";
import AdminDashboard from "./components/Admin";
import CheckoutForm from "./components/Checkout.jsx";
import Success from "./components/Success.jsx";
import "./style.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));

  return (
    <>
      <Navbar token={token}/>
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/records" element={<AllRecords />} />
          <Route path="/login" element={<LoginForm setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/records/:id" element={<SingleRecord />} />
          <Route
            path="/users/account"
            element={<AccountInfo token={token} />}
          />
          <Route path="/cart/:cartId" element={<Cart />} />
          <Route path="/admin" element={<AdminDashboard token={token} />} />
          <Route path="/checkout/:cartId" element={<CheckoutForm />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
    </>
  );
}
export default App;
