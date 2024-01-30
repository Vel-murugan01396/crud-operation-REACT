import React from 'react';
import Profile from './profile';
import Setting from './setting';
import User from './user';



export default function Home({ activeMenu }) {
 
 

  return (
    <>


<div className="p-4">

      {activeMenu === 'user' && <User />}
      {activeMenu === 'setting' && <Setting />}
      {activeMenu === 'profile' && < Profile/>}
     
    </div>
    </>
  );
};