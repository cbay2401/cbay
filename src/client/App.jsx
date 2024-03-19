import { useState } from 'react';
import {Routes, Route}  from "react-router-dom";
import LoginForm from './components/Login';
import AllRecords from './components/AllRecords';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Register from './components/Register';
import SingleRecord from './components/SingleRecord';
import AccountInfo from './components/Account';







function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(null);

  return (
    <>
      <Navbar />

<main>

  <Routes>
  <Route path="/" element={ <Homepage />}/>  
  <Route path="/records" element={<AllRecords />} />
  <Route path="/login" element={<LoginForm setToken={setToken}/>} />
  <Route path="/register" element={<Register />} />
  <Route path="records/:id" element={<SingleRecord />} />
  <Route path="/users/account" element={<AccountInfo token={token} />} />

  </Routes>
</main>
   
    </>
  );
}

export default App;
