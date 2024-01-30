import React,{ useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from "../signupPage/validation";
import {useNavigate} from "react-router-dom";
import { AppContext } from "../../AppContext"; 


export default function SignupPage() {
  // const [storedData, setStoredData] = useState({});
  const { setSignupData } = useContext(AppContext);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

const onSubmit= async (data)=>{

  setSignupData(data);
  console.log(data);
  
   

  const response = await fetch("http://localhost:3001/register", {
    method: "POST",
    
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    
  });
  console.log(response);

  

  if (response.ok) {
    
    // console.log(storedData);
    // console.log(storedData);
   
    navigate("/login")
  }
  else{
    console.log('Submission failed');
  }
  
};



  return (
    <>
      <section className="bg-blue-600 w-full h-screen flex items-center ">
        <div className="w-full h-screen  flex  flex-col">
       
          <div className="flex justify-center w-full">
            <form className="w-[100%]" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-center p-4 text-xl font-semibold text-white">
                <h1>CREAT A FREE ACCOUNT NOW</h1>
              </div>
              <div className="w-full flex justify-center p-2">
                <label className="text-sm text-black p-2">Name</label>
                <br />
                <input
                  placeholder="Enter Your Name"
                  className="w-[300px] p-2 rounded-md border text-xs md:text-sm focus:outline-none mx-14"
                  {...register("name")}
                />
              </div>
              <div className="flex justify-center ">
                  {errors.name && (
                    <p className="text-red-800 text-xs">
                      {errors.name.message?.toString()}
                    </p>
                  )}
                </div>

              <div className="w-full flex justify-center p-2">
                <label className="text-sm text-black p-2">Email</label>
                <br />
                <input
                  placeholder="Enter Your email"
                  className="w-[300px] p-2 rounded-md border text-xs md:text-sm focus:outline-none mx-14 "
                  {...register("email")}
                />
              </div>
              <div className="flex justify-center">
                  {errors.email && (
                    <p className="text-red-800 text-xs ">
                      {errors.email.message?.toString()}
                    </p>
                  )}
                </div>

              <div className="w-full flex justify-center p-2">
                <label className="text-sm text-black p-2 -mx-5">Password</label>
                <br />
                <input
                  placeholder="Enter Your Password"
                  className="w-[300px] p-2 rounded-md border text-xs md:text-sm focus:outline-none mx-8 "
                  {...register("password")}
                />
              </div>
              <div className="flex justify-center">
                  {errors.password && (
                    <p className="text-red-800 text-xs ">
                      {errors.password.message?.toString()}
                    </p>
                  )}
                </div>

              <div className="flex justify-center p-4 text-xl">
                <button className="bg-red-700 text-sm text-gray-200 p-2 rounded-md px-7 py-2">
                  CREAT ACCOUNT
                </button>
              </div>
              <div className="flex justify-center p-4 text-xl">
                <h3 className="text-lg text-white">
                  <a href="http://localhost:3000/login">
                    Allready Have Account !!
                  </a>
                </h3>
              </div>
              <div className="flex justify-center p-4 mt-7">
                <h5 className="text-sm text-white ">
                  Copyright @2023 Rthinfotech
                </h5>
              </div>
            </form>
          </div>
        
        </div>
      </section>
    </>
  );
}
