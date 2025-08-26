import React from 'react';

const StatusCard = ({ title, value, icon, color, isActive, onClick }) => {
    const activeClass = isActive ? `border-${color}-500 bg-${color}-50` : 'border-transparent';

    return (
        <div 
            onClick={onClick}
            className={`bg-white p-4 rounded-lg shadow-sm flex items-center cursor-pointer border-2 ${activeClass} hover:border-${color}-400 transition-all`}
        >
            <div className={`bg-${color}-100 text-${color}-600 p-3 rounded-full`}>
                {icon}
            </div>
            <div className="ml-4">
                <p className="font-bold text-lg text-gray-800">{value}</p>
                <p className="text-gray-500 text-sm">{title}</p>
            </div>
        </div>
    );
};

export default StatusCard;