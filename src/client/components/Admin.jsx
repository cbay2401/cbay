// components/Admin.jsx
import React, { useState } from "react";
import axios from "axios";
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [showUsers, setShowUsers] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newRecord, setNewRecord] = useState({
    artist: "",
    albumname: "",
    genre: "",
    year: "",
    imageurl: "",
    price: "",
  });
  const handleViewUsers = () => {
    axios
      .get("/api/users", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users); // Access "users" key
          setShowUsers(true);
        } else {
          console.error("Invalid users data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  const handleViewRecords = () => {
    axios
      .get("/api/records", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        setRecords(response.data);
        setShowUsers(false);
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
      });
  };
  const handleDeleteRecord = (recordId) => {
    axios
      .delete(`/api/records/${recordId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        // Remove the deleted record from the state
        setRecords(records.filter((record) => record.id !== recordId));
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  };
  const handleAddRecord = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    axios
      .post("/api/records", newRecord, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        // Add the new record to the state
        setRecords([...records, response.data]);
        // Clear the new record data
        setNewRecord({
          artist: "",
          albumname: "",
          genre: "",
          year: "",
          imageurl: "",
          price: "",
        });
      })
      .catch((error) => {
        console.error("Error adding record:", error);
      });
  };
  const filteredRecords = records.filter(
    (record) =>
      record.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.albumname.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
        <div className="admin-dashboard">
          
          <h2>Admin Dashboard</h2>
          <div className="admin-bttn-container">
            <button className="admin-btn" onClick={handleViewUsers}>
              <span>View All Users</span>
            </button>
            <button className="admin-btn" onClick={handleViewRecords}>
              <span>View All Records</span>
            </button>
          </div>
         
          {showUsers === true && users.length > 0 && (
           <div className="admin-container">

            
            <div className="admin-content">
              <h3>All Users</h3>
             
                <table className="table-container">
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>  
                    {users.map((user) => (

                    <tr key={user.id}>
                      <td><img className="admin-svg" src="../../../media/person.svg" alt="admin" /></td>
                      <td> <div className="admin-name">{user.name}</div></td>
                      <td><div className="admin-name">{user.email}</div></td>
                      <td><div className="admin-name">{user.role}</div></td>
                    </tr>
                     ))} 
                </table>
            
            </div>
        </div>
      )}
      </div>
      
      {showUsers === false && (
        <div>
          <h3 id="all-records-header">All Records</h3>
          <section className="searchbar-container">
            <input
              id="searchbar"
              type="text"
              placeholder="Search Artist/Album Name/Genre"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </section>
          <section className="records-container">
            {/* Form for adding new record */}

            <form className="add-record-form" onSubmit={handleAddRecord}>
              <h2>Add New Record</h2>
              <div className="add-record-form-content">
              <label>
                Artist:
                <input
                  type="text"
                  value={newRecord.artist}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, artist: e.target.value })
                  }
                />
              </label>
              <label>
                Album Name:
                <input
                  type="text"
                  value={newRecord.albumname}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, albumname: e.target.value })
                  }
                />
              </label>
              <label>
                Genre:
                <input
                  type="text"
                  value={newRecord.genre}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, genre: e.target.value })
                  }
                />
              </label>
              <label>
                Year:
                <input
                  type="text"
                  value={newRecord.year}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, year: e.target.value })
                  }
                />
              </label>
              <label>
                Image URL:
                <input
                  type="text"
                  value={newRecord.imageurl}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, imageurl: e.target.value })
                  }
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  value={newRecord.price}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, price: e.target.value })
                  }
                />
              </label>
              
              <button className="admin-sub" type="submit">
                Add Record
              </button>
              </div>
            </form>
            {/* Display existing records */}
            {filteredRecords.map((record) => (
              <div key={record.id} className="admin-records">
                <img className="albumcover" src={record.imageurl} alt="Album Cover" />

                <div className="admin-records-text">
                    <h4>{record.artist}</h4>
                    <h5>{record.albumname}</h5>
                    <p>${record.price}</p>
                </div>

                <div className="admin-del-container">
                    <button className="admin-del" onClick={() => handleDeleteRecord(record.id)}>
                      Delete Record
                    </button>
                </div>
              
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
