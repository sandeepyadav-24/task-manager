import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clickHandler = () => {
    console.log(name, email, password);
  };
  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/2 p-20">
        <div className="text-2xl font-semiabold mb-20">
          <span onClick={() => navigate("/")}>Task Manager</span>{" "}
        </div>
        <div>
          <div className="mb-10">
            <h1 className="text-5xl font-extrabold">Create Account</h1>
            <h1>
              Already have an account?
              <span className="underline" onClick={() => navigate("/login")}>
                Login in
              </span>{" "}
            </h1>
          </div>
          <div className="flex flex-col">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              className="border-[1px] border-black rounded-md p-1"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
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
            Sign up
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-[#124631]"></div>
    </div>
  );
};

export default SignUp;
