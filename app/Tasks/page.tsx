'use client'
import AmountInput from '@/components/Task/AmountInput';
import BalanceFilter from '@/components/Task/BalanceFilter';
import TableComponent from '@/components/Task/LapulistTable';
import RangeSelector from '@/components/Task/RangeSelector';
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
  totalBalance:string;
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
  const [totalBalance, setTotalBalance] = useState(0);
  // const [filterBalance,setFilterBalance]=useState('');
  const [filterBalance, setFilterBalance] = useState<string>('');
  // const [filteredLapulist, setFilteredLapulist] = useState<any[]>([]); // To hold filtered data
  

  const postSelectedData = async () => {


    if(!amount) alert('dhruv bhai enter first amount...');



    const updatedItems = selectedItems.map(item => {
      return {
          ...item, // Keep all other properties of the item
          amount // Update the amount field
      };
  });
    
    try {
      const response = await fetch('https://www.kashishindiapvtltd.com/api/tasks', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: updatedItems })
      });

      if (!response.ok) {
        throw new Error('Failed to post selected data');
      }
      console.log('Data posted successfully');
      alert('successfully submit');
    } catch (error) {
      console.error('Error posting data:', error);
      setError('Failed to post data');
    }
  };

  // useEffect(() => {
  //   if (filterBalance) {
  //     handleBalanceFilterChange();
  //   } else {
  //     // If no filter value, reset to the full lapulist
  //     fetchLapulist();
  //   }
  // }, [filterBalance]);

  const fetchLapulist = async () => {
    try {
      const response = await fetch('https://www.kashishindiapvtltd.com/api/lapu');
      if (!response.ok) {
        throw new Error('Failed to fetch lapulist data');
      }
      const data = await response.json();
      //here i want you change the totalBalance value 100 ,500,1000 pattren me dal do 
      setLapulist(data);
  
      const sum = data.reduce((acc: number, item: LapulistItem) => {
        // Remove '₹' and commas, then trim the string
        const balanceValue = parseFloat(
          item.balance.replace('₹', '').replace(/,/g, '').trim()
        ); // Replace commas and trim any whitespace
        // console.log(balanceValue);
        return acc + balanceValue;
      }, 0);

      const roundedSum = Math.round(sum * 100) / 100; // Multiplies by 100, rounds, and divides by 100
      setTotalBalance(roundedSum);
      // setTotalBalance(sum);
  
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
        const allSelectedItems = lapulist.filter(item => item.status !== "OFF")
          .filter(item => Number(item.totalBalance) !== 5000) // Convert totalBalance to a number for comparison
          .map(item => ({
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
      .filter(item => Number(item.totalBalance) !== 5000)
      .map(item => ({
        lapu_id: item.lapu_id,
        amount,
        user_id: currentLoggedInd
      }));
    
    setSelectedItems(rangeSelectedItems);
  };












const handleBalanceFilterChange = () => {
  const filterValue = Number(filterBalance); // Convert the filter input to a number

  // Check if the filter value is a valid number
  if (isNaN(filterValue)) {
    alert('Please enter a valid number');
    return;
  }

  // Filter the lapulist based on totalBalance
  const filtered = lapulist.filter((item) => {
    const itemBalance = item.totalBalance // Convert totalBalance to number
    return Number(itemBalance) === filterValue; // Compare as numbers
  });

  console.log(filtered);
  // setFilteredLapulist(filtered); // Set the filtered lapulist
  setLapulist(filtered);
};

  











  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFilterDate(e.target.value);
  // };

  useEffect(()=>{
    console.log(filterBalance)
  },[filterBalance])



  


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
      <p className="text-lg font-semibold text-gray-800 bg-gray-200 p-3 rounded-md shadow-md">
        Current balance on your Id: Rs: <span className="font-bold text-blue-500">{totalBalance}</span>
      </p>

      <h2 className="bg-gradient-to-r from-blue-500 to-teal-500 text-3xl font-bold mb-4 text-center text-white hover:text-blue-800 transition duration-300 transform">
        Lapu List
      </h2>

      <div className="flex justify-between items-center p-4">
       
         {/* Select All Checkbox */}
      <div className="flex justify-between">
        <RangeSelector
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          setRangeStart={setRangeStart}
          setRangeEnd={setRangeEnd}
          handleRangeChange={handleRangeChange}
        />

<div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Enter Balance"
        value={filterBalance}
        onChange={(e) => setFilterBalance(e.target.value)} // Updates filter value
        className="p-2 border border-gray-300 rounded-md ml-2"
      />
      <button
        onClick={handleBalanceFilterChange}
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button>
    </div>

      </div>

      

      <AmountInput
          amount={amount}
          handleChange={handleChange}
          postSelectedData={postSelectedData}
        />



      </div>


     
  <TableComponent
        lapulist={lapulist}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        selectAll={selectAll}
        handleSelectChange={handleSelectChange}
        currentLoggedInd={currentLoggedInd}
        amount={amount}
        handleSelectAllChange={handleSelectAllChange}
      />



      
    </div>
  );
};

export default LapulistTable;
