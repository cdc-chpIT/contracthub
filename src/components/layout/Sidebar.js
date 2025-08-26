import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiFileText, FiActivity, FiArchive, FiSettings, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Sidebar = ({ isExpanded, setIsExpanded }) => {

  const NavItem = ({ to, icon, children }) => {
    const navLinkClass = ({ isActive }) =>
      `flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-200 ${
        isActive
          ? "bg-indigo-100 text-indigo-600 font-bold"
          : "text-gray-600 hover:bg-gray-100"
      }`;

    return (
      <li>
        <NavLink to={to} className={navLinkClass}>
          <div className={`flex items-center w-full ${!isExpanded && 'justify-center'}`}>
            {icon}
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 delay-500 ${isExpanded ? 'ml-4 opacity-100' : 'ml-0 w-0 opacity-0'}`}>{children}</span>
          </div>
        </NavLink>
      </li>
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-30 bg-white shadow-lg h-screen flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? 'w-56' : 'w-20'}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-8 -right-3 w-7 h-7 bg-white hover:bg-gray-100 border-2 border-gray-200 text-gray-500 rounded-full flex items-center justify-center transition-all"
        aria-label="Toggle sidebar"
      >
        {isExpanded ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
      </button>

      <div className="pt-4 pb-2 border-b">
        <div className="flex items-center justify-center">
            <img
                src={process.env.PUBLIC_URL + '/images/logo.png'}
                alt="Company Logo"
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ height: isExpanded ? '100px' : '70px' }}
            />
        </div>
        <div
            className={`overflow-hidden transition-all duration-300 text-center ${isExpanded ? 'h-14 mt-2 opacity-100' : 'h-0 opacity-0'}`}
        >
            <h1 className="text-xl font-bold text-gray-800">ContractHub</h1>
            <p className="text-sm text-gray-500">Hệ thống quản lý hồ sơ</p>
        </div>
      </div>

      <nav className="flex-grow pt-4 px-2">
        <ul>
          <NavItem to="/" icon={<FiGrid size={24} />}>Dashboard</NavItem>
          <NavItem to="/documents" icon={<FiFileText size={24} />}>Hợp đồng</NavItem>
          <NavItem to="/activity" icon={<FiActivity size={24} />}>Hoạt động</NavItem>
          <NavItem to="/archive" icon={<FiArchive size={24} />}>Lưu trữ</NavItem>
        </ul>
      </nav>

      <div className="p-2 border-t">
        <div className={`flex p-3 items-center rounded-lg ${isExpanded ? 'justify-start' : 'justify-center'}`}>
            <img
                src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
                alt="User Avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isExpanded ? 'w-full ml-3 opacity-100' : 'w-0 ml-0 opacity-0'}`}
            >
                <p className="font-bold text-sm">ADMIN</p>
                <p className="text-xs text-gray-500">Quản trị viên</p>
            </div>
        </div>
        <ul>
          <NavItem to="/settings" icon={<FiSettings size={24} />}>Cài đặt</NavItem>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;