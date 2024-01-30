import React from "react";

const UserDetailsPopup = ({ user, onClose }) => {
  return (
   
      <div className="w-full bg-slate-600 p-2">
        <div className="w-full flex justify-between p-2">
          <h2 className="text-2xl text-white">User Details</h2>
          <span className="text-3xl text-white" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="w-full px-7 text-cyan-50">
          <p>
            Name: {user.name}
          </p>
          <p>
            Email: {user.email}
          </p>
          <p>
            Password: {user.password}
          </p>
        </div>
      </div>
   
  );
};

export default UserDetailsPopup;
