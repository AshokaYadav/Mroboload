// components/Task/BalanceFilter.tsx

import React from 'react';

interface BalanceFilterProps {
  filterBalance: string;
  setFilterBalance: React.Dispatch<React.SetStateAction<string>>;
  handleBalanceFilterChange: () => void;
}

const BalanceFilter: React.FC<BalanceFilterProps> = ({
  filterBalance,
  setFilterBalance,
  // handleBalanceFilterChange,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Enter Balance"
        value={filterBalance}
        onChange={(e) => setFilterBalance(e.target.value)} // Updates filter value
        className="p-2 border border-gray-300 rounded-md ml-2"
      />
      {/* <button
        onClick={handleBalanceFilterChange}
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button> */}
    </div>
  );
};

export default BalanceFilter;
