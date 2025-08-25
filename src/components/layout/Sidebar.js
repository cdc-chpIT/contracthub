import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiFileText, FiActivity, FiArchive, FiSettings, FiTrendingUp } from 'react-icons/fi';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Danh sách các mục menu mới, đã được Việt hóa và bổ sung
  const menuItems = [
    { to: '/', icon: FiGrid, text: 'Dashboard' },
    { to: '/documents', icon: FiFileText, text: 'Hồ sơ Hợp đồng' },
    { to: '/reports', icon: FiTrendingUp, text: 'Báo cáo' },
    { to: '/activity', icon: FiActivity, text: 'Lịch sử Hoạt động' },
  ];

  const getNavLinkClass = ({ isActive }) => {
    let baseClasses = "flex items-center p-3 my-1 mx-2 rounded-lg transition-colors duration-200 group";
    
    if (isExpanded) {
      baseClasses += " justify-start gap-4";
    } else {
      baseClasses += " justify-center";
    }

    if (isActive) {
      baseClasses += " bg-gray-100 text-blue-600";
    } else {
      baseClasses += " text-gray-600 hover:bg-gray-50 hover:text-blue-600";
    }
    
    return baseClasses;
  };

  return (
    <aside
      className={`bg-white shadow-lg h-screen flex flex-col relative transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Phần Logo và Tiêu đề */}
      <div className="flex flex-col items-center justify-center p-4 border-b min-h-[8rem] transition-all duration-300">
        <img
          src={process.env.PUBLIC_URL + '/images/logo.png'}
          alt="Company Logo"
          className="transition-all duration-300"
          style={{ width: isExpanded ? '100px' : '40px' }}
        />
        <div
          className={`text-center overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-12 mt-2 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <h1 className="text-xl font-bold text-gray-800">ContractHub</h1>
          <p className="text-sm text-gray-500">Hệ thống quản lý hồ sơ</p>
        </div>
      </div>
      
      {/* Phần Navigation */}
      <nav className="flex-grow pt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={getNavLinkClass}>
                <item.icon size={24} className="transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "w-40" : "w-0"}`}>
                  <span className="font-semibold whitespace-nowrap">{item.text}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Phần Quản trị */}
      <div className="border-t">
         <NavLink to="/admin" className={getNavLinkClass}>
          <FiSettings size={24} className="transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "w-32" : "w-0"}`}>
            <span className="font-semibold whitespace-nowrap">Quản trị</span>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;