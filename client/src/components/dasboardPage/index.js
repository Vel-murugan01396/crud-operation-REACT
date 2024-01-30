
import React, { useState } from 'react';
import Header from './header';
import Home from './home';
import Slidbar from './slidebar';




export default function DashboardList() {
 
  const [activeMenu, setActiveMenu] = useState('user');
 

  return (
    <>


<div className="flex h-screen bg-gray-100">
      <Slidbar setActiveMenu={setActiveMenu} activeMenu={activeMenu}/>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-4 py-6">
         
            <Home activeMenu={activeMenu}/>
           
          </div>
        </main>
      </div>
    </div>
   
    </>
  );
};


