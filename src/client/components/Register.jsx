import { useState } from "react";

function Register({setToken}) {
  const[name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  async function handleSubmit (event){ 
    event.preventDefault(); 

    
    try{ 

        const response = await fetch('http://localhost:3000/api/users/Register',
        {
            method: 'POST',
            headers: { 
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
                name: name,
                email: email,
                password: password,
            })
        } );
        
        
        const result = await response.json();

        console.log('Registration successful', result)
         setToken(result.token)
         localStorage.setItem('jwtToken', result.token)
    }catch(error){ 
        console.error(error.message)
    }
}
  return ( <>
  <main className="register">
      <h2> Register! </h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
              <div>
              <label> 
                  Full Name: 
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
              </label>
              </div>
              
              <div>
              <label>
                  Email:
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </label>
              </div>
              <div> 
             <label>
                  Password:
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </label>
              </div>

              <button className="btn4" type="submit">Register</button>
              
      </form>
  </main>
  </>
  )
}

export default Register;
