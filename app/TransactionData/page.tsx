'use client'
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

interface LapuItem {
  id: number;
  lapu_id: string;
  mobi_id: string;
  loginId: string;
  amount: string;
  createdAt: string;
  updatedAt:string;
}

const LapuTable: React.FC = () => {
  const [data, setData] = useState<LapuItem[]>([]); 
  const [originalData, setOriginalData] = useState<LapuItem[]>([]);
  const [showDuplicate, setShowDuplicate] = useState(false);
  const [filterDate, setFilterDate] = useState<string>(''); // State to hold the selected date

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://172.105.252.53/api/lapulist/success');
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
  
      // Filter to get duplicates
      const duplicates = originalData.filter(item => lapuIdCount[item.lapu_id] > 1);
  
      // Sort duplicates by lapu_id (convert to number for sorting)
      const sortedDuplicates = duplicates.sort((a, b) => {
        const aLapuId = Number(a.lapu_id); // Convert lapu_id to number
        const bLapuId = Number(b.lapu_id); // Convert lapu_id to number
        return aLapuId - bLapuId; // Ascending order
      });
  
      setData(sortedDuplicates); // Show sorted duplicates
    }
    setShowDuplicate(!showDuplicate); // Toggle the flag
  };
  
  
  // Handle date filter change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
  };

  // Function to export data to Excel
  // const exportToExcel = () => {
  //   //  here i want every object createdAt and updatedAt chante new Date(item.createdAt).toLocaleString() usient this one  and and then pass that data to excell
  //   console.log(data);

  //   return;
  //   const ws = XLSX.utils.json_to_sheet(data); // Convert the JSON array to an Excel worksheet
  //   const wb = XLSX.utils.book_new(); // Create a new Excel workbook
  //   XLSX.utils.book_append_sheet(wb, ws, 'Tasks'); // Append the worksheet to the workbook

  //   // Export the workbook as a .xlsx file
  //   XLSX.writeFile(wb, 'tasks.xlsx');
  // };

  const exportToExcel = () => {
    // Create a new array with formatted createdAt and updatedAt fields
    const formattedData = data.map(item => {
      return {
        ...item,  // Keep all other properties
        createdAt: new Date(item.createdAt).toLocaleString(),  // Format createdAt
        updatedAt: new Date(item.updatedAt).toLocaleString(),  // Format updatedAt
      };
    });
  
    console.log(formattedData);  // Log the modified data to check the result
  
    // Now proceed with exporting the formatted data to Excel
    const ws = XLSX.utils.json_to_sheet(formattedData);  // Convert the formatted data to an Excel worksheet
    const wb = XLSX.utils.book_new();  // Create a new Excel workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');  // Append the worksheet to the workbook
  
    // Export the workbook as a .xlsx file
    XLSX.writeFile(wb, 'tasks.xlsx');
  };
  

  // Filter data based on selected date
  const filteredData = filterDate
    ? data.filter(item => new Date(item.createdAt).toLocaleDateString() === new Date(filterDate).toLocaleDateString())
    : data; // If no date is selected, show all data

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="bg-gradient-to-r from-blue-500 to-teal-500 text-3xl font-bold mb-4 text-center text-white hover:text-blue-800 transition duration-300 transform">
        Task Payment
      </h2>

      {/* Date Filter */}
      <div className="flex justify-between  mb-4">
        <div>
        <input
          type="date"
          value={filterDate}
          onChange={handleDateChange}
          className="p-2 border border-gray-300 rounded-md ml-2"
        />
         <button
        onClick={exportToExcel}
        className="mt-4 ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Export to Excel
      </button>

        </div>
      <div >
      <button
        onClick={handleToggleDuplicate}
        className='bg-green-500 mr-4 text-white p-3 px-6 rounded-md shadow-md hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300 transform'
      >
        {showDuplicate ? 'All Data' : 'Duplicate Data'}
      </button>

      </div>
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
          {filteredData.map((item, index) => (
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
