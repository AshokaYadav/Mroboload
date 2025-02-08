// components/Task/AmountInput.tsx

import React from 'react';

interface AmountInputProps {
  amount: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  postSelectedData: () => void;
}

const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  handleChange,
  postSelectedData,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <input
        className="p-2 border border-gray-300 rounded-md ml-2"
        placeholder="Enter Amount"
        value={amount}
        onChange={handleChange}
      />
      <button
        onClick={postSelectedData}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default AmountInput;
