'use client'
import React, { useState, useEffect } from 'react';

interface TaskItem {
  id: number;
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
  const [currentLoggedInd,setCurrentLoggedIn]=useState<string>('');

  // Fetch data from the API
  const fetchTasks = async (id:string) => {
    try {
      const response = await fetch(`https://plkzmn5x-3011.inc1.devtunnels.ms/api/tasks/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
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
        setCurrentLoggedIn(parsedData.signin.loginId);  // Assuming 'signin' and 'loginId' exist in the parsed data
        fetchTasks(parsedData.signin.loginId);
      } catch (error) {
        console.error('Error parsing login data:', error);
      }
    }
  }, []);

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

      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
          <tr>
            <th className="py-3 px-6 text-center">SR No.</th>
            <th className="py-3 px-6 text-center">Lapu ID</th>
            <th className="py-3 px-6 text-center">Amount</th>
            <th className="py-3 px-6 text-center">User ID</th>
            <th className="py-3 px-6 text-center">Status</th>
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
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default TaskTable;
