import React, { createContext, useState } from "react";

export const AppContext = createContext(
  
  );

const AppContextProvider = ({ children }) => {

  const [signupData, setSignupData] = useState([]);

 
  return (
    <AppContext.Provider
      value={{
        signupData, setSignupData, 
      
        
      }}
      
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
