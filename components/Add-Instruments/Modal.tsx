// Modal.tsx
import { FormEvent, ChangeEvent } from 'react';

interface ModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  formData: { number: string; balance: string };
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
}

const Modal = ({ showModal, setShowModal, formData, handleInputChange, handleSubmit }: ModalProps) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg min-w-[300px]">
        <h2 className="text-xl font-semibold mb-4">Add New Data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700">
              Number:
            </label>
            <input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
              Balance:
            </label>
            <input
              type="text"
              id="balance"
              name="balance"
              value={formData.balance}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
