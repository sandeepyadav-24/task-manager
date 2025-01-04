import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    useId: "6778134cca2bc051c1c2c763",
    name: "",
    priority: "",
    tags: "",
  });

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/project/user/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await response.json();
        if (Array.isArray(result)) {
          setData(result);
        } else if (result.data && Array.isArray(result.data)) {
          setData(result.data); // if `result.data` contains the array
        }
        //console.log(data);
      } catch (error) {}
    };
    data();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({ name: "", priority: "", tags: "" });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      console.log("getting data form backend");
      if (response.ok) {
        alert("Details saved successfully!");
        setIsModalOpen(false); // Close the modal
        setFormData({ name: "", priority: "", tags: "" }); // Reset form
      } else {
        alert(result.message || "Failed to save details");
      }
    } catch (error) {
      alert("An error occurred while saving details.");
    }
  };
  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/6 bg-[#F9F9F9] p-5 ">
        <h1
          className="text-3xl text-bold"
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          Task Manager
        </h1>
        <div className="text-sm px-3">
          <span className="mx-1">Focus</span>
          <span className="mx-1">Prioritize</span>
          <span className="mx-1">Execute</span>
        </div>

        <div className="flex flex-row justify-between font-bold mt-10">
          <div className="text-[#A4A4A4]">Projects</div>

          <div className="mt-1 ">
            <FaPlus
              className="text-xl text-[#A4A4A4]"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        <div className="p-3">
          {data.map((e, index) => {
            return (
              <div
                className="hover:bg-[#E0E0E0] bg-[#F9F9F9] p-2 rounded cursor-pointer transition-colors"
                key={index}
                onClick={() => navigate(`/project/${e._id}`)}
              >
                {e.name}
              </div>
            );
          })}
        </div>
        {/* Logout Button */}
        <div>
          <button
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
            onClick={() => {
              localStorage.removeItem("token"); // Remove token from localStorage
              navigate("/");
              window.location.reload(); // Refresh the page
            }}
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="w-5/6 ">
        <h1 className="text-7xl text-center text-bold m-20">
          Focus prioritize Execute
        </h1>
        <h1 className="text-red-600 text-center font-semibold text-xl">
          DashBoard
        </h1>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Project Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">priority:</label>
                <input
                  type="text"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700"> Tags:</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
