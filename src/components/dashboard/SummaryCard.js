import React from 'react';

const SummaryCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow flex items-center">
      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;