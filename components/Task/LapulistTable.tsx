import React from 'react';

interface LapulistItem {
  id: number;
  lapu_id: string;
  balance: string;
  user_id: string;
  status: string;
  Lapu_No: string;
  createdAt: string;
  updatedAt: string;
  totalBalance: string;
}

interface SelectedLaput {
  lapu_id: string;
  amount: string;
  user_id: string;
}

interface TableComponentProps {
  lapulist: LapulistItem[];
  selectedItems: SelectedLaput[];
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedLaput[]>>;
  selectAll: boolean;
  handleSelectChange: (lapu_id: string, amount: string, user_id: string) => void;
  currentLoggedInd: string;
  amount: string;
  handleSelectAllChange:()=>void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  lapulist,
  selectedItems,
  // setSelectedItems,
  selectAll,
  handleSelectChange,
  currentLoggedInd,
  amount,
  handleSelectAllChange
}) => {
  return (
    <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
      <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
        <tr>
          <th className="py-3 px-6 text-center">
            Select
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange} // handleSelectAll logic here
              className="form-checkbox text-blue-500 mx-2 my-2"
            />
          </th>
          <th className="py-3 px-6 text-center">ID</th>
          <th className="py-3 px-6 text-center">Lapu ID</th>
          <th className="py-3 px-6 text-center">Balance</th>
          <th className="py-3 px-6 text-center">User ID</th>
          <th className="py-3 px-6 text-center">Total Balance</th>
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
                checked={selectedItems.some(selectedItem => selectedItem.lapu_id === item.lapu_id)}
                onChange={() => handleSelectChange(item.lapu_id, amount, currentLoggedInd)}
                className="form-checkbox text-blue-500"
                disabled={item.status === 'OFF' || item.totalBalance === '5000'}
              />
            </td>
            <td className="py-3 px-6 text-center border-b">{item.id}</td>
            <td className="py-3 px-6 text-center border-b">{item.lapu_id}</td>
            <td className="py-3 px-6 text-center border-b">{item.balance}</td>
            <td className="py-3 px-6 text-center border-b">{item.user_id.slice(0, 10)}</td>
            <td className="py-3 px-6 text-center border-b">{item.totalBalance}</td>
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
  );
};

export default TableComponent;
