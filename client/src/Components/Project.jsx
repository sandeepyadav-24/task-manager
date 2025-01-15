import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";
const Project = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setTaskIsModalOpen] = useState(false);
  const [projectData, setProjectData] = useState({});
  const [taskFormData, setTaskFormData] = useState({
    projectId: projectId,
    headline: "",
    dueDate: "",
    status: "To-Do",
    description: "",
  });

  const [formData, setFormData] = useState({
    useId: "6778134cca2bc051c1c2c763",
    name: "",
    priority: "",
    tags: "",
  });

  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  //console.log(projectId);*

  // Handle task form submission*

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(taskFormData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Task created successfully!");
        setTaskIsModalOpen(false); // Close the modal
        setTaskFormData({
          headline: "",
          dueDate: "",
          status: "To-Do",
          description: "",
        }); // Reset task form*
        setTasks((prevTasks) => ({
          ...prevTasks,
          todo: [...prevTasks.todo, result], // Assuming result is the new task*
        }));
      } else {
        toast.error(result.message || "Failed to create task");
      }
    } catch (error) {
      toast.error("An error occurred while creating the task.");
    }
  };

  // Handle task form input changes*

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;

    setTaskFormData({ ...taskFormData, [name]: value });
  };

  const handleTaskModalClose = () => {
    setTaskIsModalOpen(false);

    setTaskFormData({
      headline: "",

      dueDate: "",

      status: "To-Do",

      description: "",
    });
  };

  // Update Task Status Function*

  // Update Task Status Function*

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/task/update/${taskId}`,

        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify({ status: newStatus }),
        }
      );

      const updatedTask = await response.json();

      if (response.ok) {
        toast.success("Task status updated successfully!");

        // Move the task to the appropriate section based on the new status*

        setTasks((prevTasks) => {
          const updatedTasks = { ...prevTasks };

          // Remove task from its current section*

          for (let section in updatedTasks) {
            updatedTasks[section] = updatedTasks[section].filter(
              (task) => task._id !== taskId
            );
          }

          // Ensure newStatus section is initialized as an array if not exists*

          if (!updatedTasks[newStatus]) {
            updatedTasks[newStatus] = [];
          }

          // Add task to the new section*

          updatedTasks[newStatus] = [...updatedTasks[newStatus], updatedTask];

          return updatedTasks;
        });
      } else {
        toast.error(updatedTask.message || "Failed to update task status");
      }
    } catch (error) {
      toast.error("An error occurred while updating the task status.");
    }
  };

  // Handle form submission*

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

      if (response.ok) {
        toast.success("Details saved successfully!");

        setIsModalOpen(false); // Close the modal*

        setFormData({ name: "", priority: "", tags: "" }); // Reset form*
      } else {
        toast.error(result.message || "Failed to save details");
      }
    } catch (error) {
      toast.error("An error occurred while saving details.");
    }
  };

  // Handle form input changes*

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);

    setFormData({ name: "", priority: "", tags: "" });
  };

  useEffect(() => {
    setTaskFormData((prevState) => ({
      ...prevState,

      projectId: projectId, // Set projectId to the current project*
    }));
  }, [projectId]);

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
          setData(result.data); // if `result.data` contains the array*
        }

        //console.log(data);*
      } catch (error) {}
    };

    data();
  }, []);

  // Fetch tasks by projectId*

  useEffect(() => {
    console.log("Inside Task Fetching");

    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/task/task/${projectId}`,

          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const tasksData = await response.json();

        // Categorize tasks based on status*

        const categorizedTasks = {
          todo: tasksData.filter((task) => task.status === "To-Do"),

          inProgress: tasksData.filter((task) => task.status === "In-Progress"),

          completed: tasksData.filter((task) => task.status === "Completed"),
        };

        setTasks(categorizedTasks);
      } catch (error) {
        toast.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [projectId]);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        //console.log("just before calling api");*

        const response = await fetch(
          `http://localhost:3000/api/project/user/${projectId}`,

          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const result = await response.json();

        setProjectData(result);

        //console.log(result);*
      } catch (error) {}
    };

    dataFetch();
  }, [projectId]);

  return (
    <div className="h-screen flex flex-row ">
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

      {/** Project Ui  */}

      <div className="w-5/6">
        <div className="py-20 px-5 bg-[#C4762D]">
          <h1 className="text-white text-3xl font-semibold">
            All Projects / {projectData.name}
          </h1>
        </div>

        {/** For Table  */}

        <div className="my-10 mx-5 flex flex-row">
          <div className="text-[#A0A0A0] mx-5">
            <div className="my-1">Priority:</div>

            <div className="my-1">Tags:</div>

            <div className="my-1">Created At:</div>
          </div>

          <div className="mx-5">
            <div className=" my-1 ">
              <span className="bg-[#F0F0F0] my-1 px-5 py-1 rounded-md ">
                {projectData.priority}
              </span>
            </div>

            <div className="my-1">{projectData.tags}</div>

            <div className="my-1">{projectData.createdAt}</div>
          </div>
        </div>

        {/** New task Button  */}

        <div className="m-5">
          <button
            className="bg-[#F99639] hover:bg-[#D47F2E] text-white py-2 px-3 rounded-md cursor-pointer transition-colors "
            onClick={() => setTaskIsModalOpen(true)}
          >
            New Task
          </button>{" "}
        </div>

        {/** Task table */}

        <div className="flex flex-row bg-[#ebeaea] rounded-xl m-5 p-5 h-96 overflow-y-scroll ">
          <div className="to-do w-1/3 mx-2">
            <div className="bg-white text-center rounded-md py-1 font-semibold">
              Todo
            </div>

            {tasks.todo.length > 0 ? (
              tasks.todo.map((task, index) => (
                <div key={index} className="bg-[#F8ECC8] rounded-md p-2 my-2 ">
                  <h3 className="font-bold">{task.headline}</h3>

                  <p>{task.description}</p>

                  <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateTaskStatus(task._id, "In-Progress")}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      In Progress
                    </button>

                    <button
                      onClick={() => updateTaskStatus(task._id, "Completed")}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5">No tasks in To-Do</div>
            )}
          </div>

          <div className="in-progress w-1/3 mx-2">
            <div className="bg-white text-center rounded-md py-1 font-semibold">
              In Progress
            </div>

            {tasks.inProgress.length > 0 ? (
              tasks.inProgress.map((task, index) => (
                <div key={index} className="bg-[#C8EAF7] rounded-md  p-5 my-2">
                  <h3 className="font-bold">{task.headline}</h3>

                  <p>{task.description}</p>

                  <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateTaskStatus(task._id, "To-Do")}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      To-Do
                    </button>

                    <button
                      onClick={() => updateTaskStatus(task._id, "Completed")}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5">No tasks in Progress</div>
            )}
          </div>

          <div className="completed w-1/3 mx-2">
            <div className="bg-white text-center rounded-md py-1 font-semibold">
              Completed
            </div>

            {tasks.completed.length > 0 ? (
              tasks.completed.map((task, index) => (
                <div key={index} className="bg-[#C8F8CC] rounded-md p-2 my-2">
                  <h3 className="font-bold">{task.headline}</h3>

                  <p>{task.description}</p>

                  <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateTaskStatus(task._id, "In-Progress")}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      In Progress
                    </button>

                    <button
                      onClick={() => updateTaskStatus(task._id, "To-Do")}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      To-Do
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5">No completed tasks</div>
            )}
          </div>
        </div>
      </div>

      {/** Modal Code */}

      {/** Modal for Task Creation */}

      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Create Task</h2>

            <form onSubmit={handleTaskSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Headline:</label>

                <input
                  type="text"
                  name="headline"
                  value={taskFormData.headline}
                  onChange={handleTaskInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Due Date:</label>

                <input
                  type="date"
                  name="dueDate"
                  value={taskFormData.dueDate}
                  onChange={handleTaskInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Status:</label>

                <select
                  name="status"
                  value={taskFormData.status}
                  onChange={handleTaskInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="To-Do">To-Do</option>

                  <option value="In-Progress">In-Progress</option>

                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>

                <textarea
                  name="description"
                  value={taskFormData.description}
                  onChange={handleTaskInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleTaskModalClose}
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

      {/** Modal for New Project */}

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

export default Project;
