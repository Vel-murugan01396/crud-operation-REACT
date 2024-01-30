import React,{useState} from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginschema } from "../loginPage/validation";
import {useNavigate} from "react-router-dom";




export default function LoginPage(){
  const [storedData, setStoredData] = useState({});
  // const { setSignupData } = useContext(AppContext);




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginschema),
  });
  const navigate = useNavigate();

const onSubmit= async (data)=>{

  // setSignupData(data);
  setStoredData(data);
  
 console.log(storedData);


  const response = await fetch("http://localhost:3001/login", {
    method: "POST",
    
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    
  });
  console.log(response);

  
  

  if (response.ok) {
   
    // console.log(storedData);
    navigate("/dasboard" ,)
  }
  else{
    console.log('Submission failed');
  }
  
};

    return(<>
    <section className="bg-amber-500 w-full h-screen flex items-center ">
        <div className="  w-[40%] h-[80%]  mx-auto  rounded-md flex justify-center ">
          <div>
            
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center p-4 text-xl font-semibold">
                  <h1>LOGIN REGISTER</h1>
                </div>
                <div className="w-full flex justify-center p-2">
                  <label className="text-sm text-black p-2 mx-3">USERID</label>
                  <br />
                  <input
                    placeholder="Enter Your User name"
                    className="w-[300px] p-2 rounded-md border text-xs md:text-sm focus:outline-none mx-5 "
                    {...register("email")}
                  />
                </div>
                <div className="flex justify-center -ml-16">
                  {errors.email && (
                    <p className="text-deep-orange-400 text-xs">
                      {errors.name.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="w-full flex justify-center p-2">
                  <label className="text-sm text-black p-2">PASSWORD</label>
                  <br />
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    className="w-[300px] p-2 rounded-md border text-xs md:text-sm focus:outline-none mx-1"
                    {...register("password")}
                  />
                </div>
                <div className="flex justify-center -mr-20">
                  {errors.password && (
                    <p className="text-deep-orange-400  text-xs ">
                      {errors.password.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="flex justify-center p-4 text-xl">
                  <button className="bg-slate-900  text-sm text-gray-200 p-2 rounded-md px-7 py-2">
                    LOGIN
                  </button>
                </div>
               
              </form>
            </div>
          </div>
        </div>
      </section>
    </>)
}