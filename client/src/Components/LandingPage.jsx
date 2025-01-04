import React from "react";
import { useNavigate } from "react-router-dom";

const teamMembers = [
  {
    name: "Front-End Dev",
    color: "bg-purple-200",
    img: "https://avatars.githubusercontent.com/u/103882286?v=4",
  },
  {
    name: "UI/UX Designer",
    color: "bg-green-200",
    img: "https://avatars.githubusercontent.com/u/103882286?v=4",
  },
  {
    name: "Project Manager",
    color: "bg-blue-200",
    img: "https://avatars.githubusercontent.com/u/103882286?v=4",
  },
  {
    name: "Back-End Dev",
    color: "bg-indigo-200",
    img: "https://avatars.githubusercontent.com/u/103882286?v=4",
  },
  {
    name: "Product Designer",
    color: "bg-pink-200",
    img: "https://avatars.githubusercontent.com/u/103882286?v=4",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="font-sans text-gray-800">
      {/* Header*/}
      <header className="flex justify-between items-center ">
        <div className="text-2xl font-bold">Task Manager</div>
        <nav className="space-x-6">
          <a href="#about" className="hover:text-blue-600">
            About Us
          </a>
          <a href="#pricing" className="hover:text-blue-600">
            Pricing
          </a>
          <a href="#features" className="hover:text-blue-600">
            Features
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact Us
          </a>
          <a href="#faq" className="hover:text-blue-600">
            FAQ
          </a>
        </nav>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </button>
      </header>

      {/* Hero Section*/}
      <section className="text-center py-16 bg-gray-50">
        <h1 className="text-4xl font-extrabold mb-4">
          The One-Stop Solution For <br />
          <span className="text-blue-600">Website Task Management</span>
        </h1>
        <p className="text-gray-600 mb-6">Get more done, with less stress.</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded">
          Get Early Access
        </button>

        {/* Team Members*/}
        <div className="relative mt-16 flex justify-center space-x-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`flex flex-col items-center rounded-full p-4 ${member.color}`}
            >
              <img
                src={member.img}
                alt={member.name}
                className="rounded-full w-16 h-16 mb-2"
              />
              <span className="text-sm">{member.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/*Trusted Companies */}
      <div className="text-center py-6 bg-gray-100">
        <h3 className="text-gray-500 uppercase tracking-wide mb-4">
          Trusted by Fast-Growing Companies
        </h3>
        <div className="flex justify-center space-x-12">
          <span className="text-gray-400">Microsoft</span>
          <span className="text-gray-400">Apple</span>
          <span className="text-gray-400">pixel</span>
          <span className="text-gray-400">Google</span>
        </div>
      </div>
      {/** Other Section */}
      <div className="bg-[#EEF4FD] p-40">
        <h1 className="text-[#2660AA] ">SAY GOODBYE TO TASK OVERLOAD</h1>
        <h1>Stay on top of your to-do list with our powerful task manager</h1>
        <div className="flex flex-row">
          <div className="bg-white rounded-lg m-10">
            <h1>Roadmap view</h1>
            <h2>
              User can view their task in calender format to help with
              scheduling and time management
            </h2>
          </div>
          <div className="bg-white rounded-lg m-10">
            <h1>Task Progress</h1>
            <h2>
              User can see progress for upcoming task to ensure they don't miss
              important deadlines
            </h2>
          </div>
          <div className="bg-white rounded-lg m-10">
            <h1>Task Collaboration </h1>
            <h2>
              User can comment on task, attach files, and communicate with team
              members to stay up to date on progress
            </h2>
          </div>
        </div>
      </div>

      {/** Frequently asked Question  */}
      <div className="flex flex-row">
        <div className="w-1/2">
          <h1>Want to know more</h1>
          <div className="text-3xl">Frequently asked question</div>
          <h1>Couldn't find what you were looking for?</h1>
        </div>
        <div className="w-1/2"></div>
      </div>

      {/** Footer Section  */}
      <footer className="m-10">
        <div className="flex justify-between">
          <div>Task Manager </div>
          <div className="flex flex-row">
            <div className="mx-5">About us </div>
            <div className="mx-5">Pricing </div>
            <div className="mx-5">Payment policy</div>
            <div className="mx-5">Contact us</div>
          </div>
        </div>
        <hr />
        <div>
          <h1>Made by sandeep yadav</h1>
          <h1>Copyright @ 2025 Tak Manager. All Right Reserved.</h1>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

{
  /***/
}
