import React from 'react';

interface RangeSelectorProps {
  rangeStart: number;
  rangeEnd: number;
  setRangeStart: React.Dispatch<React.SetStateAction<number>>;
  setRangeEnd: React.Dispatch<React.SetStateAction<number>>;
  handleRangeChange: () => void;
}

const RangeSelector: React.FC<RangeSelectorProps> = ({
  rangeStart,
  rangeEnd,
  setRangeStart,
  setRangeEnd,
  handleRangeChange,
}) => {
  return (
    <div className="flex justify-between">
      <input
        type="number"
        placeholder="Start Index"
        value={rangeStart}
        onChange={(e) => setRangeStart(Number(e.target.value))}
        className="p-2 border border-gray-300 rounded-md w-40"
      />
      <input
        type="number"
        placeholder="End Index"
        value={rangeEnd}
        onChange={(e) => setRangeEnd(Number(e.target.value))}
        className="p-2 border border-gray-300 rounded-md ml-2 w-40"
      />
      <button
        onClick={handleRangeChange}
        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 ml-4"
      >
        Select Range
      </button>
    </div>
  );
};

export default RangeSelector;
