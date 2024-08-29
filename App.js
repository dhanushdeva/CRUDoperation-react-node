import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', age: '', phone: '', email: '', gender: 'Male', status: 'Active' });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3001/users');
    setUsers(response.data);
  };

  const addUser = async () => {
    const response = await axios.post('http://localhost:3001/users', formData);
    setUsers([...users, response.data]);
    setFormData({ name: '', age: '', phone: '', email: '', gender: 'Male', status: 'Active' });
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = async (id) => {
    const response = await axios.put(`http://localhost:3001/users/${id}`, formData);
    setUsers(users.map((user) => (user.id === id ? response.data : user)));
    setFormData({ name: '', age: '', phone: '', email: '', gender: 'Male', status: 'Active' });
  };

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="app">
      <h1>User Management</h1>
      
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={addUser}>Add User</button>
      </div>

      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter"
      />

      <div className="user-list">
        {filteredUsers.map((user) => (
          <div className="user-card" key={user.id}>
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
            <p>Phone: {user.phone}</p>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>
            <p>Status: {user.status}</p>
            <button onClick={() => updateUser(user.id)}>Update</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
