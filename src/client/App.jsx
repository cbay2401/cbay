// app.jsx
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
// import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from "./components/Admin";
import Footer from "./components/Footer.jsx";
import CheckoutForm from "./components/Checkout.jsx";
import Success from "./components/Success.jsx";
function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  
  // useEffect(() => {
  //   // Check if token exists in localStorage when component mounts
  //   const storedToken = localStorage.getItem('jwtToken');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);
  return (
    <>
      <Navbar />
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
          <Route path="/success" element={<Success/>}/>
        </Routes>
      </main>
      {/* <Footer /> */}
    </>
  );
}
export default App;
