//rafce
import React, { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {};
  // 01:24:00

  return (
    <div className="h-screen bg-green-100 overflow-hidden relative ">
      <div className="login-ui-box right-10 -top-40" />
      <div
        className="container h-screen flex items-center justify-center
     px-50 mx-auto"
      >
        <div className="w-2/4 h-[90vh] flex items-end bg-[url('https://images.pexels.com/photos/32665746/pexels-photo-32665746.jpeg')] bg-cover bg-center rounded-lg p-10  z-50">
          <div className="text-white ">
            <h4 className="text-2xl font-semibold leading-[58px]">
              Create Your Stories
            </h4>
            <p className=" text-[15px] leading-6 pr-7 mt-4">
              Welcome back—your next story awaits, Your adventures are calling.
            </p>
          </div>
        </div>

        <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleSubmit}>
            <h4 className="text-white font-semibold mb-7">Login</h4>

            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* alt+shift+f */}

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-xs text-slate-500 text-center my-4"> OR</p>

            <button
              type="submit"
              className="btn-primary btn-light"
              onClick={() => navigate("/sign-up")}
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
