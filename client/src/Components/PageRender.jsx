import React from "react";
import Dashboard from "./dashboard";
import LandingPage from "./LandingPage";

const PageRender = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return (
      <div>
        <Dashboard />
      </div>
    );
  } else {
    return <LandingPage />;
  }
};

export default PageRender;
