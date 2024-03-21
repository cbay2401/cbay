// components/AdminDashboard.jsx

import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [records, setRecords] = useState([]);
    const [showUsers, setShowUsers] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleViewUsers = () => {
        axios.get('/api/users', { headers: { Authorization: localStorage.getItem('token') } })
            .then(response => {
                if (Array.isArray(response.data.users)) {
                    setUsers(response.data.users); // Access "users" key
                    setShowUsers(true);
                } else {
                    console.error('Invalid users data format:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    const handleViewRecords = () => {
        axios.get('/api/records', { headers: { Authorization: localStorage.getItem('token') } })
            .then(response => {
                setRecords(response.data);
                setShowUsers(false);
            })
            .catch(error => {
                console.error('Error fetching records:', error);
            });
    };


    const handleDeleteRecord = (recordId) => {
        axios.delete(`/api/records/${recordId}`, { headers: { Authorization: localStorage.getItem('token') } })
            .then(response => {
                // Remove the deleted record from the state
                setRecords(records.filter(record => record.id !== recordId));
            })
            .catch(error => {
                console.error('Error deleting record:', error);
            });
    };


    const filteredRecords = records.filter(
        (record) =>
          record.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.albumname.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={handleViewUsers}>View All Users</button>
            <button onClick={handleViewRecords}>View All Records</button>
            {showUsers === true && users.length > 0 && (
                <div>
                    <h3>All Users</h3>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {showUsers === false && (
                <div>
                    <h3>All Records</h3>
                    <section className="searchbar-container">
                        <input id="searchbar" type="text"
                        placeholder = "Search Artist/Album Name/Genre"
                        value={searchQuery}
                        onChange={(e)=> setSearchQuery(e.target.value)}/>
                    </section>    
                    <section className="records-container">
                        {filteredRecords.map((record) => (
                            <div key={record.id} className='records'>
                                <img className='albumcover' src={record.imageurl} alt='Album Cover' />
                                <h1>{record.artist}</h1>
                                <h2>{record.albumname}</h2>
                                <p>${record.price}</p>
                                <button onClick={() => handleDeleteRecord(record.id)}>Delete Record</button>
                            </div>
                        ))}
                    </section>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;