'use client'
import Modal from '@/components/Add-Instruments/Modal';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

interface DataItem {
  id: number;
  number: string;
  balance: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ number: string; balance: string }>({ number: '', balance: '' });
  const [editedBalances, setEditedBalances] = useState<{ [key: number]: string }>({});

  async function fetchData() {
    try {
      const response = await fetch('https://www.kashishindiapvtltd.com/api/mobikwik');
      const result: DataItem[] = await response.json();
      setData(result);
    } catch (error) {
      // console.error('Error fetching data:', error);
      console.log('Error fetching data:', error);
    }
  }

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log('Fetching data...');
  //     fetchData();
  //   }, 30000);
    
  //   fetchData();
  // }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Fetching data...');
      fetchData();
    }, 30000);
  
    fetchData(); // First fetch immediately
  
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBalanceChange = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    setEditedBalances((prevBalances) => ({
      ...prevBalances,
      [id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://www.kashishindiapvtltd.com/api/mobikwik', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        setShowModal(false);
        fetchData();
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleBalanceUpdate = async (id: number) => {
    const updatedBalance = editedBalances[id];
    try {
      const response = await fetch(`https://www.kashishindiapvtltd.com/api/mobikwik/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ balance: updatedBalance }),
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error('Failed to update balance');
      }
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };


  const handleUpdateStatus = async (id: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'; // Toggle the status

      const response = await fetch(`https://www.kashishindiapvtltd.com/api/mobikwik/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }), // Payload only contains the status field
      });

      if (response.ok) {
        setData((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, status: newStatus } : user
          )
        );
      } else {
        console.log('Error: Could not update status');
      }
    } catch (error) {
      console.log('Error updating user status:', error);
    }
  };

  const handleBalanceDelete = async (id: number) => {
    try {
      const response = await fetch(`https://www.kashishindiapvtltd.com/api/mobikwik/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error('Failed to delete balance');
      }
    } catch (error) {
      console.error('Error deleting balance:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="bg-gradient-to-r from-blue-500 to-teal-500 text-3xl font-bold mb-6 text-center text-white hover:text-blue-800 transition duration-300 transform">
        Mobikwik Data
      </h2>

      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Add Data
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            <tr>
              <th className="px-4 py-2 border-b text-center">Sr. No.</th>
              <th className="px-4 py-2 border-b text-center">Number</th>
              <th className="px-4 py-2 border-b text-center">Balance</th>
              <th className="px-4 py-2 border-b text-center">Status</th>
              <th className="px-4 py-2 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                <td className="px-4 py-2 border-b text-center">{item.number}</td>

                <td className="px-4 py-2 border-b text-center">
                  <input
                    value={editedBalances[item.id] || item.balance}
                    onChange={(e) => handleBalanceChange(item.id, e)}
                    className="w-40 px-4 py-2 border border-gray-300 rounded-md"
                  />
                </td>

                <td className="px-4 py-2 border-b text-center">
                <button
                onClick={() => handleUpdateStatus(item.id, item.status)}
                className={`text-white px-4 py-1 rounded-full ${
                  item.status === 'Active'
                    ? 'bg-green-500'  // Green for Active
                    : 'bg-red-500'    // Red for Inactive
                } w-24`}
              >
                {item.status}
              </button>
                </td>

                <td className="px-4 py-1 border-b text-center">
                  <button
                    onClick={() => handleBalanceUpdate(item.id)}
                    className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition duration-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleBalanceDelete(item.id)}
                    className="bg-red-600 ml-2 text-white px-4 py-1 rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
