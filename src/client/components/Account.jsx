import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

function AccountInfo({ token }) {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    

    console.log("Token: ", token);

    async function fetchUserData() {
        const token = localStorage.getItem("jwtToken");
      try {
        const { data } = await axios.get(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(data);
       
      } catch (error) {
        console.error("Can't Get Your User Data, Bozo", error);
      }
      
    }
    if (data) {
      fetchUserData();
    }
  }, [token, id]);

  return (
    <>
      <div id="accountinfo">
        <h1>Account Info</h1>
        <p>{data ? `${data.name}'s Information` : "Loading..."}</p>
        <hr />
        {/* <h2>{data.name}</h2>     */}
      </div>
    </>
  );
}

export default AccountInfo;
