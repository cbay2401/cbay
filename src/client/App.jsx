import { useState } from 'react';
import Login from './components/Login';
import AllRecords from './components/AllRecords';



function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
        <h1>Boilerplate</h1>
        <img id='logo' src='../../../media/cbay.png'></img>
        <p>Replace the starter code in this template with something cool</p>
        <Login />
        <AllRecords />
    </div>
  );
}

export default App;
