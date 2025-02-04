'use client'
import React, { useEffect, useState } from 'react';

interface LapuItem {
  id: number;
  lapu_id: string;
  mobi_id: string;
  loginId: string;
  amount: string;
  createdAt: string;
}

const LapuTable: React.FC = () => {
  const [data, setData] = useState<LapuItem[]>([]); 
  const [originalData, setOriginalData] = useState<LapuItem[]>([]);
  const [showDuplicate, setShowDuplicate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://plkzmn5x-3011.inc1.devtunnels.ms/api/lapulist/success');
        const result: LapuItem[] = await response.json();
        setData(result);
        setOriginalData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleToggleDuplicate = () => {
    if (showDuplicate) {
      setData(originalData); // Reset to original data
    } else {
      const lapuIdCount = originalData.reduce((count, item) => {
        count[item.lapu_id] = (count[item.lapu_id] || 0) + 1;
        return count;
      }, {} as { [key: string]: number });

      const duplicates = originalData.filter(item => lapuIdCount[item.lapu_id] > 1);
      setData(duplicates); // Show only duplicates
    }
    setShowDuplicate(!showDuplicate); // Toggle the flag
  };

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="bg-gradient-to-r from-blue-500 to-teal-500 text-3xl font-bold mb-4 text-center text-white hover:text-blue-800 transition duration-300 transform">
        Task Payment
      </h2>
      <div className='flex justify-end'>
        <button
          onClick={handleToggleDuplicate}
          className='bg-green-500 p-2 m-2 text-white'
        >
          {showDuplicate ? 'Show All Data' : 'Show Duplicate Data'}
        </button>
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
          <tr>
            <th className="px-4 py-2 border text-center">Sr no</th>
            <th className="px-4 py-2 border text-center">Lapu ID</th>
            <th className="px-4 py-2 border text-center">Mobi ID</th>
            <th className="px-4 py-2 border text-center">Login ID</th>
            <th className="px-4 py-2 border text-center">Amount</th>
            <th className="px-4 py-2 border text-center">Payment At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border text-center">{index + 1}</td>
              <td className="px-4 py-2 border text-center">{item.lapu_id}</td>
              <td className="px-4 py-2 border text-center">{item.mobi_id}</td>
              <td className="px-4 py-2 border text-center">{item.loginId}</td>
              <td className="px-4 py-2 border text-center">{item.amount}</td>
              <td className="px-4 py-2 border text-center">{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LapuTable;
