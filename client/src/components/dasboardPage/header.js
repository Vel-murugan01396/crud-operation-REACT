// import React from 'react';
import React  from 'react';

import {useNavigate} from "react-router-dom";




export default function Header() {
 


  const navigate = useNavigate();
 
 const handleButton=()=>{

  navigate("/login" )

 }

  return (
    <>
   
        <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center text-2xl font-bold bg-gradient-to-r from-orange-400 via-yellow-500 to-black text-transparent bg-clip-text">
           
           RTH
            
          </div>

          <div className="flex items-center">
            <span className="mr-2 text-base text-black"></span>
            
            <button onClick={handleButton} className='w-full bg-sky-900 text-sm px-3 py-1 rounded text-white'>Logout</button>
          </div>
         
        </header>
      
      
    </>
  );
};