import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  loginId: string;
  password: string;
  twoFactor: string;
}

interface UserFormProps {
  onSubmit: (formData: FormData) => void; // Handler function for form submission
  onClose: () => void; // Handler function to close the form
}

const UserForm = ({ onSubmit, onClose }: UserFormProps) => {
  // Form data state
  const [formData, setFormData] = useState<FormData>({
    loginId: '',
    password: '',
    twoFactor: '',
  });

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to the parent component
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      {/* Form section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 border border-red-300 rounded-lg shadow-lg w-full sm:w-96"
      >
        <div className="mb-4">
          <label htmlFor="loginId" className="block text-lg font-semibold text-gray-700">
            Enter MRobotic Login ID
          </label>
          <input
            type="text"
            name="loginId"
            value={formData.loginId}
            onChange={handleInputChange}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
            Enter MRobotic Password
          </label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="twoFactor" className="block text-lg font-semibold text-gray-700">
            Enter 2FA Code
          </label>
          <input
            type="text"
            name="twoFactor"
            value={formData.twoFactor}
            onChange={handleInputChange}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full mt-4">
          Submit
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded-full mt-4 ml-4"
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default UserForm;
