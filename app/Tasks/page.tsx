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

interface SelectedLaput {
  lapu_id: string;
  amount: string;
  user_id: string;
}

const LapulistTable: React.FC = () => {
  const [lapulist, setLapulist] = useState<LapulistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<SelectedLaput[]>([]); // Track selected rows
  const [currentLoggedInd, setCurrentLoggedIn] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [selectAll, setSelectAll] = useState<boolean>(false); // Track if all are selected
  const [rangeStart, setRangeStart] = useState<number>(0);
  const [rangeEnd, setRangeEnd] = useState<number>(0);

  const postSelectedData = async () => {
    try {
      const response = await fetch('https://plkzmn5x-3011.inc1.devtunnels.ms/api/tasks', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: selectedItems })
      });

      if (!response.ok) {
        throw new Error('Failed to post selected data');
      }
      console.log('Data posted successfully');
    } catch (error) {
      console.error('Error posting data:', error);
      setError('Failed to post data');
    }
  };

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

  useEffect(() => {
    console.log(amount);
  }, [amount]);

  // Set the current logged in user from localStorage
  useEffect(() => {
    const storedLoginData = localStorage.getItem('loginData');

    if (storedLoginData) {
      try {
        const parsedData = JSON.parse(storedLoginData);
        setCurrentLoggedIn(parsedData.signin.loginId);
      } catch (error) {
        console.error('Error parsing login data:', error);
      }
    }
    fetchLapulist();
  }, []);

  const handleSelectChange = (lapu_id: string, amount: string, user_id: string) => {
    setSelectedItems((prevSelectedItems) => {
      const selectedItem = { lapu_id, amount, user_id };
      if (prevSelectedItems.some(item => item.lapu_id === lapu_id)) {
        return prevSelectedItems.filter(item => item.lapu_id !== lapu_id);
      } else {
        return [...prevSelectedItems, selectedItem];
      }
    });
  };

  useEffect(()=>{
    console.log(selectedItems)
  },[selectedItems]);

  const handleSelectAllChange = () => {
    setSelectAll(prevState => {
      const newState = !prevState;
      if (newState) {
        // Select all items
        const allSelectedItems = lapulist.filter(item => item.status !== "OFF") .map(item => ({
          lapu_id: item.lapu_id,
          amount,
          user_id: currentLoggedInd
        }));
        setSelectedItems(allSelectedItems);
      } else {
        // Deselect all items
        setSelectedItems([]);
      }
      return newState;
    });
  };


  const handleRangeChange = () => {
    // Adjust for 1-based index input
    const start = Math.max(0, rangeStart - 1); // Subtract 1 from the input
    const end = Math.max(0, rangeEnd - 1); // Subtract 1 from the input
    
    // Filter out items where status is "OFF"
    const rangeSelectedItems = lapulist.slice(start, end + 1)
      .filter(item => item.status !== "OFF") // Filter out items with status "OFF"
      .map(item => ({
        lapu_id: item.lapu_id,
        amount,
        user_id: currentLoggedInd
      }));
    
    setSelectedItems(rangeSelectedItems);
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-4 px-4 py-2 overflow-x-auto">
      <p className="text-lg font-semibold text-gray-800 bg-gray-200 p-3 rounded-md shadow-md">
        Current Logged In: <span className="font-bold text-blue-500">{currentLoggedInd}</span>
      </p>

      <h2 className="bg-gradient-to-r from-blue-500 to-teal-500 text-3xl font-bold mb-4 text-center text-white hover:text-blue-800 transition duration-300 transform">
        Lapu List
      </h2>

      <div className="flex justify-between items-center p-4">
       
         {/* Select All Checkbox */}
      <div className="flex justify-between p-4">

    
        <input
          type="number"
          placeholder="Start Index"
          value={rangeStart}
          onChange={(e) => setRangeStart(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          placeholder="End Index"
          value={rangeEnd}
          onChange={(e) => setRangeEnd(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-md ml-2"
        />
        <button
          onClick={handleRangeChange}
          className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 ml-4"
        >
          Select Range
        </button>

      </div>

      <div>
        <input
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Enter Amount"
          value={amount}
          onChange={handleChange}
        />
        <button
          onClick={postSelectedData}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-4"
        >
          Submit
        </button>

        </div>


      </div>

     

      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
          <tr>
            <th className="py-3 px-6 text-center">Select
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAllChange}
            className="form-checkbox text-blue-500 mx-2 my-2"
          />
      
            </th>
            <th className="py-3 px-6 text-center">ID</th>
            <th className="py-3 px-6 text-center">Lapu ID</th>
            <th className="py-3 px-6 text-center">Balance</th>
            <th className="py-3 px-6 text-center">User ID</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Lapu No</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {lapulist.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-6 text-center border-b">
                <input
                  type="checkbox"
                  checked={selectedItems.some(selectedItem => selectedItem.lapu_id === item.lapu_id)}
                  onChange={() => handleSelectChange(item.lapu_id, amount, currentLoggedInd)}
                  className="form-checkbox text-blue-500"
                  disabled={item.status === 'OFF'}
                />
              </td>
              <td className="py-3 px-6 text-center border-b">{item.id}</td>
              <td className="py-3 px-6 text-center border-b">{item.lapu_id}</td>
              <td className="py-3 px-6 text-center border-b">{item.balance}</td>
              <td className="py-3 px-6 text-center border-b">{item.user_id.slice(0, 10)}</td>
              <td className="py-3 px-6 text-center border-b">
                <span
                  className={`px-3 py-1 rounded-full ${item.status === 'ON' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
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
