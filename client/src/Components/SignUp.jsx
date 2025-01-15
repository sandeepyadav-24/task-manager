import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clickHandler = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill in all the fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success(data.message); // User registered successfully
        navigate("/login"); // Redirect to login page
      } else {
        toast.error(data.message || "An error occurred.");
      }
    } catch (error) {
      toast.error("Failed to sign up. Please try again later.");
    }
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
