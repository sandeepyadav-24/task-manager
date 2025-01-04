import React from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const Navbar = () => {
  const Navigate = useNavigate();
  const clickHandler = () => {
    localStorage.removeItem("Authentication");
    Navigate("/");
    location.reload();
  };
  return (
    <div className="flex flex-row py-5 px-20   justify-between bg-[#F8F6F1] border-b-black        border-[1px]">
      <div className="text-3xl font-bold font-serif ">
        <Link to="/">
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </Link>
      </div>

      <div className="flex flew-row">
        <div className="text-xl font-medium mx-3">
          <Link to="/login">Log in</Link>
        </div>
        <div className="text-lg text-white font-sm mx-3 bg-[#04A72E] border-black border-[1px] py-1 px-2 rounded-md">
          <Link to="/signup">Start for free</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
