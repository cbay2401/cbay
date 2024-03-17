import { useState } from 'react';
import Login from './components/Login';
import AllRecords from './components/AllRecords';
import Navbar from './components/Navbar';
import {Routes, Route}  from "react-router-dom";
import Homepage from './components/Homepage';
import Register from './components/Register';






function App() {
  const [count, setCount] = useState(0);

  return (
    <>
     <Navbar />
    


<main>

  <Routes>
  <Route path="/" element={ <Homepage />}/>  
  <Route path="/records" element={<AllRecords />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  </Routes>
</main>
   
    </>
  );
}

export default App;
