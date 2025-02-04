import React from 'react';

interface User {
  id: number;
  loginId: string;
  status: string;
}


interface UserTableProps {
  users: User[];
  onStatusClick: (id: number, status: string) => void;
  onLoginClick: (loginData: { loginId: string; password: string }) => void;
  onDeleteClick: (id: number) => void;
  currentLoggedInd: string; // Add this line
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onStatusClick,
  onLoginClick,
  onDeleteClick,
  currentLoggedInd
}) => {

  console.log(users);
  return (
    <div className="mt-8  py-2 overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
          <tr>
            <th className="py-2 px-4 text-center">Sr.no</th>
            <th className="py-2 px-4 text-center">MRobo login Id</th>
            <th className="py-2 px-4 text-center">Status</th>
            <th className="py-2 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">{user.loginId}</td>
              <td className="py-2 px-4 border-b text-center">



              <button
                onClick={() => onStatusClick(user.id, user.status)}
                className={`text-white px-4 py-1 rounded-full ${
                  user.status === 'Active'
                    ? 'bg-green-500'  // Green for Active
                    : 'bg-red-500'    // Red for Inactive
                } w-24`}
              >
                {user.status}
              </button>





              </td>





              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => onLoginClick({loginId: user.loginId, password: 'werwer'})}
                  className={`text-white px-4 py-1 rounded-full ${
                    currentLoggedInd === user.loginId 
                      ? 'bg-green-500'   // Green if logged in
                      : 'bg-blue-500'    // Blue if not logged in
                  } w-24`} // Add a fixed width class (w-24 = 6rem)
                >
                  {currentLoggedInd === user.loginId ? 'Logged' : 'Login'}
                </button>

                
                <button
                  onClick={() => onDeleteClick(user.id)}
                  className={`px-4 py-1 rounded-full ml-2 w-24 text-white
                    ${currentLoggedInd === user.loginId ? 'bg-red-500 cursor-not-allowed opacity-50' : 'bg-red-500'}`
                  }
                  disabled={currentLoggedInd !== user.loginId} // Disable the button if condition is met
                >
                  Delete
                </button>


              </td>






            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
