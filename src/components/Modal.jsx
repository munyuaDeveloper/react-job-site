import React from 'react';

const Modal = ({ isOpen, onClose,onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg px-6 py-3 w-2/3 md:w-1/3 lg:w-1/3">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;