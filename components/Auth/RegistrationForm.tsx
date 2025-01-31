import React, { useState } from 'react';
import InputField from './InputField'; // Import InputField component
import SubmitButton from './SubmitButton';

interface FormProps {
  onSubmit: (formData: { name: string; mobileno: string; password: string }) => void;
  error: string;
  successMessage: string;
}

const RegistrationForm: React.FC<FormProps> = ({ onSubmit, error, successMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobileno: '',    
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!formData.name || !formData.mobileno || !formData.password || !formData.confirmPassword) {
      alert('All fields are required');
      return;
    }

    // Pass form data to the parent onSubmit function
    onSubmit({
      name: formData.name,
      mobileno: formData.mobileno,
      password: formData.password,
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

      <InputField
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Enter your name"
        required
      />

      <InputField
        label="Mobileno Number"
        name="mobileno"
        type="text"
        value={formData.mobileno}
        onChange={handleInputChange}
        placeholder="Enter your mobileno number"
        required
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        required
      />

      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirm your password"
        required
      />

      <SubmitButton text="Register" onClick={() => {}} /> {/* onClick is handled by the form submission itself */}
    
    </form>
  );
};

export default RegistrationForm;
