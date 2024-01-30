import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import UserDetailsPopup from "./UserDetailsPopup";
import AddUserDetailsPopup from "./AddUserDetailsPopup";



export default function User() {
  const { signupData , setSignupData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    password: "",
  });
  



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/register");
        const result = await response.json();

        if (result) {
          
          setSignupData(result);
        } else {
          console.error("Error during fetch:", response.status);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
  }, [setSignupData]);

  //update popup

  const toggleModal = (user) => {
    setModalOpen(!isModalOpen);
    setSelectedUser({...user});
    setUpdateData({
         name: user.name,
         email: user.email,
         password: user.password,
     });
     console.log(selectedUser)
  };


  //view popup
  const toggleViewModal = (user) => {
    setViewModalOpen(!isViewModalOpen);
    setSelectedUser({ ...user });
  };

//Add popup
  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };

 //Add user

  const handleAddUser = async (newUser) => {
    try {
      // Optimistically update the UI
      setSignupData([...signupData, newUser]);
  
      const response = await fetch("http://localhost:3001/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (response.ok) {
        const addedUser = await response.json();
        // Keep the server response, or update further if needed
      } else {
        console.error('Error during user addition:', response.status);
        // Rollback the UI state if there is an error
        setSignupData(signupData.filter(user => user.id !== newUser.id));
      }
      toggleAddModal();
    } catch (error) {
      console.error('Error during user addition:', error);
      // Rollback the UI state if there is an error
      setSignupData(signupData.filter(user => user.id !== newUser.id));
    }
  };
  
  


 

  //update method

 
  const handleUpdate = async () => {
    try {
     
      const updatedSignupData = signupData.map((user) =>
        user._id === selectedUser._id ? { ...user, ...updateData } : user
      );
      setSignupData(updatedSignupData);
  
      const response = await fetch(`http://localhost:3001/register/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      if (response.ok) {
       
        setModalOpen(false);
      } else {
        
        setSignupData(signupData);
        console.error('Error during update:', response.status);
      }
    } catch (error) {
      
      setSignupData(signupData);
      console.error('Error during update:', error);
    }
  };
  



  //delete method
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/register/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedSignupData = signupData.filter(user => user._id !== userId);
        setSignupData(updatedSignupData);
      } else {
        console.error('Error during delete:', response.status);
      }
    } catch (error) {
      console.error('Error during delete:', error);
    }
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
   
  };
  const filteredUsers = signupData.filter((user) =>
  (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
);

// const filteredUsers = Array.isArray(signupData)
//     ? signupData.filter((user) =>
//         user.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : [];

 
  return (
    <>
      {isModalOpen && (
        <div className="w-full bg-slate-400">
          <div className="modal-content">
            <div className="w-full flex justify-between p-2">
              <h2 className="text-lg text-white">Update User</h2>
              <span
                className="text-3xl text-white"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </span>
            </div>

            <div className="w-full px-2">
              <input
                type="text"
                placeholder="Name"
                className="p-2 m-1"
                value={updateData.name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="p-2 m-1"
                value={updateData.email}
                onChange={(e) =>
                  setUpdateData({ ...updateData, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="p-2 m-1"
                value={updateData.password}
                onChange={(e) =>
                  setUpdateData({ ...updateData, password: e.target.value })
                }
              />
              <button
               onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm m-1"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


{isViewModalOpen && (
        <UserDetailsPopup
          user={selectedUser}
          onClose={() => setViewModalOpen(false)}
        />
      )}

{isAddModalOpen && (
        <AddUserDetailsPopup onClose={toggleAddModal} onAddUser={handleAddUser} />
      )}




      <section className="w-full h-screen text-slate-100 p-1">
        <div className="w-full p-2 flex justify-between">
          <h2 className="text-2xl text-red-600">User Datas</h2>

          <div className="flex">
                <input
                   type="text"
                   placeholder="Search..."
                   className="border text-sm text-black px-1 rounded-l"
                  onChange={(e) => handleSearch(e.target.value)}
                     />
           </div>
          <button 
          onClick={toggleAddModal}
          className="bg-orange-500 hover:bg-orange-700 text-white py-1 px-2 rounded text-sm m-1">
            +ADD USER
          </button>
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-slate-400 text-base text-black">
                Name
              </th>
              <th className="border px-4 py-2 bg-slate-400 text-base text-black">
                Email
              </th>
              <th className="border px-4 py-2 bg-slate-400 text-base text-black">
                Password
              </th>
              <th className="border px-4 py-2 bg-slate-400 text-base text-black">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className={selectedUser._id === user._id ? "bg-gray-200" : ""}>
                <td className="border px-4 py-2 bg-red-400 text-white text-xs">
                  {user.name}
                </td>
                <td className="border px-4 py-2 bg-red-400 text-white text-xs">
                  {user.email}
                </td>
                <td className="border px-4 py-2 bg-red-400 text-white text-xs ">
                  {user.password}
                </td>
                <td className="border  bg-red-400 text-white flex justify-center">
                  <button
                   onClick={() => 
                    toggleModal(user)
                  }
                    className={`bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm m-1 ${
                      selectedUser._id === user._id ? "border-2 border-blue-500" : ""
                    }`}
                  >
                    Update
                  </button>
                  <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded text-sm m-1">
                    Delete
                  </button>
                  <button 
              onClick={() => toggleViewModal(user)}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded text-sm m-1">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
