// UserDetailsPopup.js

import React, { useState } from "react";

const AddUserDetailsPopup = ({ onClose, onAddUser }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    // Perform any validation if needed before adding the user
    onAddUser(newUser);
    onClose();
  };

  return (
    <div className="w-full bg-slate-400">
      <div className="modal-content">
        <div className="w-full flex justify-between p-2">
          <h2 className="text-lg text-white">Add User</h2>
          <span className="text-3xl text-white" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="w-full px-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-2 m-1"
            value={newUser.name}
            onChange={handleInputChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 m-1"
            value={newUser.email}
            onChange={handleInputChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 m-1"
            value={newUser.password}
            onChange={handleInputChange}
          />

          <button
            onClick={handleAddUser}
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm m-1"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserDetailsPopup;
