'use client'
import React, { useState, useEffect } from 'react';

interface TaskItem {
  id: string;
  lapu_id: string;
  amount: string;
  user_id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]); // Store fetched tasks
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  // const [currentLoggedInd, setCurrentLoggedIn] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>(''); // State for the selected status filter

  // Fetch data from the API
  const fetchTasks = async (id: string, status: string) => {
    try {
      const response = await fetch(`http://172.105.252.53/api/tasks/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      // Filter the tasks based on the selected status
      const filteredTasks = status ? data.filter((task: TaskItem) => task.status === status) : data;
      setTasks(filteredTasks);
      setLoading(false);
    } catch (err) {
      setError('Error: ' + err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedLoginData = localStorage.getItem('loginData');
  
    // Check if the login data exists in localStorage
    if (storedLoginData) {
      try {
        const parsedData = JSON.parse(storedLoginData);
        // setCurrentLoggedIn(parsedData.signin.loginId);  // Assuming 'signin' and 'loginId' exist in the parsed data
        fetchTasks(parsedData.signin.loginId, selectedStatus); // Fetch tasks with the current selected status
      } catch (error) {
        console.error('Error parsing login data:', error);
      }
    }
  }, [selectedStatus]); // Run again when the selected status changes

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const deleteTaskHandler = async (id: string) => {
    try {
      // Confirm before deleting
      const confirmDelete = window.confirm("Are you sure you want to delete this task?");
      if (!confirmDelete) return;
  
      // Make the DELETE request to the API
      const response = await fetch(`http://172.105.252.53/api/tasks/${id}`, {
        method: 'DELETE',
      });
  
      // Handle response
      if (!response.ok) {
        throw new Error("Failed to delete the task");
      }
  
      // Optionally, you can do something after successful deletion, like updating the UI
      alert(`Task with ID ${id} has been deleted successfully`);
  
      // Remove item from the local state or refetch data
      // For example:
      setTasks(prevTasks => prevTasks.filter(item => item.id !== id)); 
  
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('An error occurred while deleting the task');
    }
  };
  
  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-4 px-4 py-2 overflow-x-auto">
      <h2 className="bg-gradient-to-r from-blue-500 to-teal-500 text-3xl font-bold mb-4 text-center text-white hover:text-blue-800 transition duration-300 transform">
        Detail List
      </h2>

      {/* Dropdown for status filter */}
      <div className="mb-4 flex justify-end mr-6">
        <label htmlFor="statusFilter" className="mr-2 text-lg font-medium text-gray-700">
          Status:
        </label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={handleStatusChange}
          className=" border border-gray-300 rounded-lg"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
          <tr>
            <th className="py-3 px-6 text-center">SR No.</th>
            <th className="py-3 px-6 text-center">Lapu ID</th>
            <th className="py-3 px-6 text-center">Amount</th>
            <th className="py-3 px-6 text-center">User ID</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {tasks.map((task, index) => (
            <tr key={task.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-6 text-center border-b">{index + 1}</td>
              <td className="py-3 px-6 text-center border-b">{task.lapu_id}</td>
              <td className="py-3 px-6 text-center border-b">{task.amount}</td>
              <td className="py-3 px-6 text-center border-b">{task.user_id}</td>
              <td className="py-3 px-6 text-center border-b">
                <span
                  className={`px-3 py-1 rounded-full ${
                    task.status === 'Pending'
                      ? 'bg-yellow-500 text-white'
                      : task.status === 'InQueue'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="py-3 px-6 text-center border-b">
                <button onClick={()=>deleteTaskHandler(task.id)}
                  className='p-2 m-2 bg-red-600 text-white rounded-lg shadow-lg'
                  >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
