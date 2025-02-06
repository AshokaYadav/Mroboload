import { useState, useEffect } from 'react';
import UserTable from './UserTable';
import UserForm from './UserForm';

interface User {
  id: number;
  loginId: string;
  status: string;
  // Add other fields as necessary
}

interface FormData {
  loginId: string;
  password: string;
  twoFactor: string;
}

const FormComponent = () => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]); // Specified the correct type for 'users'
  const [currentLoggedInd, setCurrentLoggedIn] = useState<string>('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://172.105.252.53/api/get');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched users:', data);
        setUsers(data.users); // Store the fetched data in the state
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  // Fetch users from the API using GET request
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
    fetchUsers(); // Call the function when the component mounts
  }, []);

  // Handle form submission
  const handleFormSubmit = async (formData: FormData) => {
    try {
      const response = await fetch('http://172.105.252.53/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert the formData to JSON string
      });

      if (response.ok) {
        setFormVisible(false); // Close the form on success
        fetchUsers(); // Refresh user list
      } else {
        console.error('Error creating user');
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  // Handle the delete action
  const handleDeleteClick = async (id: number) => {
    console.log(`Delete clicked for user with ID: ${id}`);
    try {
      const response = await fetch(`http://172.105.252.53/api/user/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Delete request failed:', error);
    }
  };

  const handleUpdateStatus = async (id: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'; // Toggle the status

      const response = await fetch(`http://172.105.252.53/api/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }), // Payload only contains the status field
      });

      if (response.ok) {
        setUsers((prevUsers) =>
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

  // const handleLoginClick = async (loginData: { loginId: string, password: string }) => {
  //   console.log(`Login clicked with loginId: ${loginData.loginId}`);

  //   try {
  //     const response = await fetch('http://172.105.252.53/api/user/login/manual', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(loginData), // Send loginData as the request body
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       localStorage.setItem('loginData', JSON.stringify(data));

  //       const storedLoginData = localStorage.getItem('loginData');
  //       if (storedLoginData) {
  //         try {
  //           const parsedData = JSON.parse(storedLoginData);
  //           setCurrentLoggedIn(parsedData.signin.loginId);
  //         } catch (error) {
  //           console.error('Error parsing login data:', error);
  //         }
  //       }
  //     } else {
  //       console.error('Login failed');
  //     }
  //   } catch (error) {
  //     console.error('Request failed:', error);
  //   }
  // };


  const handleLoginClick = async (loginData: { loginId: string, password: string }) => {
    console.log(`Login clicked with loginId: ${loginData.loginId}`);

    try {
      // Make both API calls concurrently using Promise.all()
      const [loginResponse, stopResponse] = await Promise.all([
        fetch('http://172.105.252.53/api/get/login/manual', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        }),
        fetch('http://172.105.252.53/stop', { method: 'GET' }),
      ]);

      if (loginResponse.ok) {
        const data = await loginResponse.json();
        localStorage.setItem('loginData', JSON.stringify(data));

        console.log('Login successful');
        const storedLoginData = localStorage.getItem('loginData');
        if (storedLoginData) {
          try {
            const parsedData = JSON.parse(storedLoginData);
            setCurrentLoggedIn(parsedData.signin.loginId);
          } catch (error) {
            console.error('Error parsing login data:', error);
          }
        }
      } else {
        console.error('Login failed');
      }

      if (stopResponse.ok) {
        console.log('Stop API was called successfully');
      } else {
        // console.error('Failed to call the stop API');
        alert('process did\'t stop...')
      }

    } catch (error) {
      console.error('Request failed:', error);
    }
  };








  return (
    <div className="mx-auto p-4">
      {/* Button to open form */}
      <div className="flex justify-end">
        <button
          onClick={() => setFormVisible(true)}
          className="bg-blue-500 text-white px-6 py-1 rounded-full"
        >
          Create Login
        </button>
      </div>

      {/* Modal background overlay */}
      {formVisible && (
        <UserForm
          onSubmit={handleFormSubmit} // Pass the form submission handler as prop
          onClose={() => setFormVisible(false)} // Close the form
        />
      )}

      {/* Display the status and action */}
      <UserTable
        users={users}
        onStatusClick={handleUpdateStatus}
        onLoginClick={handleLoginClick}
        onDeleteClick={handleDeleteClick}
        currentLoggedInd={currentLoggedInd}
      />
    </div>
  );
};

export default FormComponent;









































// import { useState, useEffect } from 'react';
// import UserTable from './UserTable';
// import UserForm from './UserForm';

// interface FormData {
//   loginId: string;
//   password: string;
//   twoFactor: string;
// }

// const FormComponent = () => {
//   const [formVisible, setFormVisible] = useState<boolean>(false);
//   const [users, setUsers] = useState<any[]>([]); // Initialize as an empty array
//   const [status, setStatus] = useState<string>('');
//   const [currentLoggedInd,setCurrentLoggedIn]=useState<string>('');
//   const storedLoginData='';

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('http://172.105.252.53/api/user');
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched users:', data);
//         setUsers(data.users); // Store the fetched data in the state
//       } else {
//         console.error('Failed to fetch users');
//         setStatus('Error: Could not fetch users');
//       }
//     } catch (error) {
//       console.error('Request failed:', error);
//       setStatus('Error: Request failed');
//     }
//   };

//   // Fetch users from the API using GET request
//   useEffect(() => {
    
//     const storedLoginData = localStorage.getItem('loginData');
  
//     // Check if the login data exists in localStorage
//     if (storedLoginData) {
//       try {
//         const parsedData = JSON.parse(storedLoginData);
//         setCurrentLoggedIn(parsedData.signin.loginId);  // Assuming 'signin' and 'loginId' exist in the parsed data
//       } catch (error) {
//         console.error('Error parsing login data:', error);
//       }
//     }



//     fetchUsers(); // Call the function when the component mounts
//   }, []);

//   // Handle form submission
//   const handleFormSubmit = async (formData: FormData) => {
//     try {
//       const response = await fetch('http://172.105.252.53/api/user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData), // Convert the formData to JSON string
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('User created successfully:', data);
//         setStatus('Form Submitted Successfully');
//         setFormVisible(false); // Close the form on success
//         fetchUsers();
//       } else {
//         const errorData = await response.json();
//         console.error('Error creating user:', errorData);
//         setStatus('Error: Could not create user');
//       }
//     } catch (error) {
//       console.error('Request failed:', error);
//       setStatus('Error: Request failed');
//     }
//   };

//   // Handle the delete action
//   const handleDeleteClick = async (id: number) => {
//     console.log(`Delete clicked for user with ID: ${id}`);

//     try {
//       const response = await fetch(`http://172.105.252.53/api/user/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
//         setStatus('User deleted successfully');
//       } else {
//         console.error('Failed to delete user');
//         setStatus('Error: Could not delete user');
//       }
//     } catch (error) {
//       console.error('Delete request failed:', error);
//       setStatus('Error: Request failed');
//     }
//   };

//   const handleUpdateStatus = async (id: number, currentStatus: string) => {
//     try {
//       const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'; // Toggle the status

//       const response = await fetch(`http://172.105.252.53/api/user/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus }), // Payload only contains the status field
//       });

//       if (response.ok) {
//         const updatedUser = await response.json(); // Expect the updated user object


//         setUsers((prevUsers) =>
//           prevUsers.map((user) =>
//             user.id === id ? { ...user, status: newStatus } : user
//           )
//         );
//         console.log(`User status updated to ${newStatus}`);
//       } else {
//         console.log('Error: Could not update status');
//       }
//     } catch (error) {
//       console.log('Error updating user status:', error);
//     }
//   };



//   const handleLoginClick = async (loginData: { loginId: string, password: string }) => {
//     console.log(`Login clicked with loginId: ${loginData.loginId}`);

//     // setCurrentLoggedIn('Loading...')
  
//     try {
//       // Making the POST request to the API
//       const response = await fetch('http://172.105.252.53/api/user/login/manual', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(loginData), // Send loginData as the request body
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Login successful:', data);
      
//         // Store the login data (or token) in localStorage
//         localStorage.setItem('loginData', JSON.stringify(data)); 

//         const storedLoginData = localStorage.getItem('loginData');
  
//         // Check if the login data exists in localStorage
//         if (storedLoginData) {
//           try {
//             const parsedData = JSON.parse(storedLoginData);
//             setCurrentLoggedIn(parsedData.signin.loginId);  // Assuming 'signin' and 'loginId' exist in the parsed data
//           } catch (error) {
//             console.error('Error parsing login data:', error);
//           }
//         }
//         // setCurrentLoggedIn(loginData.loginId);
//       } else {
//         const errorData = await response.json();
//         console.error('Login failed:', errorData);
//         // Handle failure: show error message to the user
//         // setCurrentLoggedIn('Login')
//       }
//     } catch (error) {
//       console.error('Request failed:', error);
//       // Handle network or other errors
//       // setCurrentLoggedIn('Login')
//     }
//   };





  
//   return (
//     <div className="mx-auto p-4">
//       {/* Button to open form */}
//       <div className="flex justify-end">
//         <button
//           onClick={() => setFormVisible(true)}
//           className="bg-blue-500 text-white px-6 py-1 rounded-full"
//         >
//           Create Login
//         </button>
//       </div>

//       {/* Modal background overlay */}
//       {formVisible && (
//         <UserForm
//           onSubmit={handleFormSubmit} // Pass the form submission handler as prop
//           onClose={() => setFormVisible(false)} // Close the form
//         />
//       )}

//       {/* Display the status and action */}
//       <UserTable
//         users={users}
//         onStatusClick={handleUpdateStatus}
//         onLoginClick={handleLoginClick}
//         onDeleteClick={handleDeleteClick}
//         currentLoggedInd={currentLoggedInd}
//       />
//     </div>
//   );
// };

// export default FormComponent;
