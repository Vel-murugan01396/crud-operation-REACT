import React from 'react';




export default function Slidbar({ setActiveMenu, activeMenu }) {
 
  

  return (
    <>
    
     


<div className="bg-gray-800 text-white h-screen p-4 w-64 flex flex-col gap-8 justify-center items-center">
  <div className='w-full'> 
    <img src='\rth.png' alt="Description of the image"/>     
  </div>
      <div onClick={() => setActiveMenu('user')} className={activeMenu === 'user' ? 'active' : ''}>
       User
      </div>
      <div onClick={() => setActiveMenu('profile')} className={activeMenu === 'profile' ? 'active' : ''}>
       Profile
      </div>
      <div onClick={() => setActiveMenu('setting')} className={activeMenu === 'setting' ? 'active' : ''}>
        Setting
      </div>
     
    </div>
     
    </>
  );
};


