'use client'
export default function NotFoundPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-red-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mt-2">No Found!</h2>
          <p className="text-gray-500 mt-4">The requested resource could not be found!</p>
          <button 
            className="mt-6 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-300"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
   