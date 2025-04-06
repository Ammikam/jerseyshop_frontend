import React, { useState } from 'react';
import { initiatePayment } from '../app/utils/lipanampesa';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, totalAmount }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Default values for accountReference and transactionDesc
  const defaultAccountReference = "Ammikam";
  const defaultTransactionDesc = "Product Payments";

  const handlePayment = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!phoneNumber) {
      setError('Please enter a phone number');
      setLoading(false);
      return;
    }

    try {
      await initiatePayment({ 
        amount: totalAmount, 
        phoneNumber,
        accountReference: defaultAccountReference,
        transactionDesc: defaultTransactionDesc
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error('Payment failed:', error);
      setError('Payment failed. Please check your phone number and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Pay with M-Pesa</h2>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          className="w-full mb-4 p-2 border border-gray-300 rounded text-gray-800"
          aria-label="Phone Number"
        />
        <p className="mb-4 text-gray-600">Amount to pay: KES {totalAmount}</p>
        <div className="flex justify-between">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-150 ease-in-out"
            aria-label="Pay"
          >
            {loading ? 'Processing...' : 'Pay'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-700 p-2 rounded hover:bg-gray-800 transition duration-150 ease-in-out"
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
        {error && <p className="text-red-500 mt-4" role="alert">{error}</p>}
        {success && <p className="text-green-500 mt-4" role="alert">Mpesa stk push successful! complete payments on your phone.</p>}
      </div>
    </div>
  );
};

export default PaymentModal;
