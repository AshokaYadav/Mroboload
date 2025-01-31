import React from 'react';

interface User {
  id: number;
  loginId: string;
  status: string;
}

// interface UserTableProps {
//   users: User[];
//   onStatusClick: (id: number,status:string) => void;
//   onLoginClick: (id: number) => void;
//   onDeleteClick: (id: number) => void;
// }

interface UserTableProps {
  users: User[];
  onStatusClick: (id: number, status: string) => void;
  onLoginClick: (loginData: { loginId: string; password: string }) => void;
  onDeleteClick: (id: number) => void;
 
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onStatusClick,
  onLoginClick,
  onDeleteClick,
}) => {

  console.log(users);
  return (
    <div className="mt-8">
      <table className="min-w-full table-auto ">
        <thead>
          <tr className="bg-gray-100">
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
                  onClick={() => onStatusClick(user.id,user.status)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-full"
                >
                  {user.status}
                </button>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
              onClick={() => onLoginClick({loginId: user.loginId, password: 'werwer'})}
              className="bg-green-500 text-white px-4 py-2 rounded-full"
            >
              { 
                // Retrieve and safely parse login data from localStorage
                (() => {
                  const storedLoginData = localStorage.getItem('loginData');
                  if (storedLoginData) {
                    try {
                      const parsedData = JSON.parse(storedLoginData);
                      return parsedData.signin.loginId == user.loginId ? "Logged" : 'Login';
                    } catch (error) {
                      console.error('Error parsing login data:', error);
                      return 'Login';
                    }
                  } else {
                    return 'Login';
                  }
                })()
              }
            </button>

                <button
                  onClick={() => onDeleteClick(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full ml-2"
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
