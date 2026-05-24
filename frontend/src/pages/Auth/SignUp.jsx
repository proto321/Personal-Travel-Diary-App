//rafce
import React, { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { validateEmail } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {loading} = useSelector((state) => state.user)

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!name) {
      setError("Please enter your name.");
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    // Simple email validation function
  }

    if (!password) {
      setError("Please enter your password.");
      return
    }

    setError(null); // Clear any previous errors // npm i axios
    
    // SignUP API call
    try {

      const response = await axiosInstance.post("/auth/signup", {
         username: name,
         email,
         password,
         })

         // handle successful sign-up response
         if (response.data){
          
          navigate("/login");
         } 
        } catch (error) {
          
          // error.response && error.response.data && error.response.data.message
          // error?.response?.data?.message
          if(error.response && 
            error.response.data && 
            error.response.data.message) 
            {
            // error.response.data.message
            setError(error?.response?.data?.message)
         } else {
          setError("Something went wrong. Please try again.")
         }
        } }
    return (
    <div className="h-screen bg-green-100 overflow-hidden relative ">
      <div className="login-ui-box right-10 -top-40" />
      <div
        className="container h-screen flex items-center justify-center
     px-50 mx-auto"
      >
        <div className="w-2/4 h-[90vh] flex items-end bg-[url('https://images.pexels.com/photos/8936887/pexels-photo-8936887.jpeg')] bg-cover bg-center rounded-lg p-10  z-50">
          <div className="text-white ">
            <h4 className="text-2xl font-semibold leading-14.5">
              Create Your Stories
            </h4>
            <p className=" text-[15px] leading-6 pr-7 mt-4">
              Welcome back—your next story awaits, Your adventures are calling.
            </p>
          </div>
        </div>

        <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleSignUp}>
            <h4 className="text-white font-semibold mb-7">Create Your Account</h4>

            <input
              type="text"
              placeholder="Enter Your Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


            <PasswordInput
              value={password}
              onChange={(e) =>{ setPassword(e.target.value)
              }}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>  }
            
              {loading ? (<p className="animate-pulse w-full text-center btn-">LOADING...</p>
              ) : <button type="submit" className="btn-primary">
                SIGN UP
              </button>}

            <p className="text-xs text-slate-500 text-center my-4"> OR</p>

            <button
              type="submit"
              className="btn-primary btn-light"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
