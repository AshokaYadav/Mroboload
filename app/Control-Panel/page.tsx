'use client'
import useAuthCheck from '@/hooks/useAuthCheck'
import { useState } from 'react';

const StartStopButton: React.FC = () => {
  const [status, setStatus] = useState<string>('Idle');
  const [loading, setLoading] = useState<boolean>(false);
  useAuthCheck();

  // Handle Start button click
  const handleStart = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://172.105.252.53/start', {
        method: 'GET',
      });
      if (response.ok) {
        setStatus('Started');
      } else {
        setStatus('Error starting');
      }
    } catch (error) {
      setStatus('Error starting');
    } finally {
      setLoading(false);
    }
  };

  // Handle Stop button click
  const handleStop = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://172.105.252.53/stop', {
        method: 'GET',
      });
      if (response.ok) {
        setStatus('Stopped');
      } else {
        setStatus('Alredy Stopped');
      }
    } catch (error) {
      setStatus('Error stopping');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-gray-300  shadow-lg  mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Control API</h1>
      <div className="flex space-x-4">
        <button
          onClick={handleStart}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Starting...' : 'Start'}
        </button>
        <button
          onClick={handleStop}
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Stopping...' : 'Stop'}
        </button>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-800">Status: {status}</p>
    </div>
  );
};

export default StartStopButton;
