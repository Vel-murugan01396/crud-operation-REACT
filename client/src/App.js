import React from "react";
import AppContextProvider from "./AppContext";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import SignupPage from "./components/signupPage";
import DasboardPage from "./components/dasboardPage";
import LoginPage from "./components/loginPage";



function App() {
 
  return (
   

    <AppContextProvider>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<SignupPage/>}></Route>
      
        <Route path="/dasboard" element={<DasboardPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        
    </Routes>
    
    </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;



