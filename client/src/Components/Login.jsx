import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickHandler = async () => {
    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      toast.error("invalid credentials");
    }
  };
  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/2 p-20">
        <div className="text-2xl font-semiabold mb-20">Task Manager </div>
        <div>
          <div className="mb-10">
            <h1 className="text-5xl font-extrabold">Sign In</h1>
            <h1>
              Don't have an account?{" "}
              <span className="underline" onClick={() => navigate("/signup")}>
                Create now
              </span>
            </h1>
          </div>

          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              className="border-[1px] border-black rounded-md p-1"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="text"
              placeholder="Password"
              className="border-[1px] border-black rounded-md p-1"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>

          <div
            className="bg-[#124631] text-white rounded-md text-center py-3 my-5"
            onClick={clickHandler}
          >
            Sign in
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-[#124631]"></div>
    </div>
  );
};

export default Login;
