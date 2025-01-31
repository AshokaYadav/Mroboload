'use client'
import React, { useState, useEffect } from 'react';

interface LapulistItem {
  id: number;
  lapu_id: string;
  balance: string;
  user_id: string;
  status: string;
  Lapu_No: string;
  createdAt: string;
  updatedAt: string;
}

const LapulistTable: React.FC = () => {
  const [lapulist, setLapulist] = useState<LapulistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);  // Track selected rows

  // Fetch data from the API
  useEffect(() => {
    const fetchLapulist = async () => {
      try {
        const response = await fetch('https://plkzmn5x-3011.inc1.devtunnels.ms/api/lapulist');
        if (!response.ok) {
          throw new Error('Failed to fetch lapulist data');
        }
        const data = await response.json();
        setLapulist(data);
        setLoading(false);
      } catch (err) {
        setError('Error: ' + err);
        setLoading(false);
      }
    };
    fetchLapulist();
  }, []);

  const handleSelectChange = (id: number) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter(item => item !== id);  // Deselect
      } else {
        return [...prevSelectedItems, id];  // Select
      }
    });
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-8 px-4 py-2 overflow-x-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Lapu List</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
          <tr>
            <th className="py-3 px-6 text-center">Select</th>
            <th className="py-3 px-6 text-center">ID</th>
            <th className="py-3 px-6 text-center">Lapu ID</th>
            <th className="py-3 px-6 text-center">Balance</th>
            <th className="py-3 px-6 text-center">User ID</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Lapu No</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {lapulist.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-6 text-center border-b">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectChange(item.id)}
                  className="form-checkbox text-blue-500"
                />
              </td>
              <td className="py-3 px-6 text-center border-b">{item.id}</td>
              <td className="py-3 px-6 text-center border-b">{item.lapu_id}</td>
              <td className="py-3 px-6 text-center border-b">{item.balance}</td>
              <td className="py-3 px-6 text-center border-b">{item.user_id.slice(0, 10)}</td>
              <td className="py-3 px-6 text-center border-b">
                <span
                  className={`px-3 py-1 rounded-full ${
                    item.status === 'ON' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-3 px-6 text-center border-b">{item.Lapu_No.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LapulistTable;
