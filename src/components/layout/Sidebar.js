import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiFileText, FiActivity, FiArchive, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getNavLinkClass = ({ isActive }) => {
    // Luôn có justify-center để căn giữa nội dung
    // Thêm 'gap-4' để tạo khoảng cách giữa icon và text khi mở rộng
    let baseClasses = "flex items-center justify-center p-3 my-1 rounded-lg transition-colors duration-200 group gap-4";
    
    if (isActive) {
      baseClasses += " bg-gray-100 text-blue-600";
    } else {
      baseClasses += " text-gray-600 hover:bg-gray-50 hover:text-blue-600";
    }
    
    // Bỏ logic if (!isExpanded) vì đã đưa justify-center ra ngoài
    return baseClasses;
  };

  return (
    <aside
      className={`bg-white shadow-lg h-screen flex flex-col relative transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Phần Logo - Đã được căn giữa chính xác */}
      <div className="flex items-center justify-center p-4 border-b h-20">
        <img 
          src={process.env.PUBLIC_URL + '/images/logo.png'} 
          alt="Company Logo" 
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ width: isExpanded ? '100px' : '40px' }}
        />
      </div>
      
      {/* Phần Navigation */}
      {/* Sử dụng padding bên trong nav để các item có thể căn giữa trên toàn bộ chiều rộng */}
      <nav className="flex-grow pt-4 px-2">
        <ul>
          <li>
            <NavLink to="/" className={getNavLinkClass}>
              <FiGrid size={24} className="transition-transform duration-200 group-hover:scale-110" />
              {/* Bỏ ml-4 vì đã dùng 'gap-4' ở thẻ NavLink */}
              {isExpanded && <span className="font-semibold">Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/documents" className={getNavLinkClass}>
              <FiFileText size={24} className="transition-transform duration-200 group-hover:scale-110" />
              {isExpanded && <span className="font-semibold">Documents</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/activity" className={getNavLinkClass}>
              <FiActivity size={24} className="transition-transform duration-200 group-hover:scale-110" />
              {isExpanded && <span className="font-semibold">Activity</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/archive" className={getNavLinkClass}>
              <FiArchive size={24} className="transition-transform duration-200 group-hover:scale-110" />
              {isExpanded && <span className="font-semibold">Archive</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Phần Settings */}
      <div className="p-2 border-t">
         <NavLink to="/settings" className={getNavLinkClass}>
          <FiSettings size={24} className="transition-transform duration-200 group-hover:scale-110" />
          {isExpanded && <span className="font-semibold">Settings</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;