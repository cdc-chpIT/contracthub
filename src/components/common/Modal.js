import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM để sử dụng Portal
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, title, children, maxWidth = '2xl' }) => {
  if (!isOpen) return null;

  const maxWidthClasses = {
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    'full': 'w-11/12', // Sử dụng gần full-width để đẹp hơn
  };

  // Sử dụng ReactDOM.createPortal để render Modal ra ngoài cây DOM hiện tại
  return ReactDOM.createPortal(
    // Lớp phủ (Backdrop)
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-[1000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Nội dung Modal */}
      <div 
        className={`bg-white rounded-lg shadow-2xl w-full ${maxWidthClasses[maxWidth]} flex flex-col max-h-[90vh]`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b flex-shrink-0">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <FiX size={24} />
          </button>
        </div>
        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body // Đích đến của Portal là thẻ <body>
  );
};

export default Modal;