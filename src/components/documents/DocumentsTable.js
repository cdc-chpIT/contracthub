import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical, FiTrash2, FiShare } from 'react-icons/fi';

// Mở rộng hàm tạo màu cho tất cả các trạng thái mới
const getStatusBadge = (status) => {
    const statusMap = {
      'Đang triển khai': 'bg-blue-100 text-blue-800',
      'Hoàn thành': 'bg-green-100 text-green-800',
      'Chờ phê duyệt': 'bg-yellow-100 text-yellow-800',
      'Chờ ký': 'bg-orange-100 text-orange-800',
      'Đã thanh lý/Quyết toán': 'bg-gray-100 text-gray-800',
      'Tạm dừng': 'bg-purple-100 text-purple-800',
      'Hủy': 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusMap[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};


const DocumentsTable = ({ title, documents, showViewAllLink = true, onDelete, onRestore }) => {
    const [menuOpen, setMenuOpen] = useState(null);
    const menuRef = useRef(null);

    // Xử lý đóng menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleActionClick = (e, action, docId) => {
        e.preventDefault();
        e.stopPropagation();
        if (action) {
            action(docId);
        }
        setMenuOpen(null);
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-gray-800">{title}</h3>
                {showViewAllLink && (
                    <a href="#" className="text-blue-600 text-sm font-semibold">Xem tất cả</a>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-gray-500 border-b">
                            <th className="py-3 px-2">Mã HĐ</th>
                            <th className="py-3 px-2">Tên dự án</th>
                            <th className="py-3 px-2">Ngày bắt đầu</th>
                            <th className="py-3 px-2">Ngày hết hạn</th>
                            <th className="py-3 px-2">Người phụ trách</th>
                            <th className="py-3 px-2 w-48">Trạng thái</th>
                            <th className="py-3 px-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc) => (
                            <tr key={doc.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                <td className="py-3 px-2 font-mono text-xs">{doc.id}</td>
                                <td className="py-3 px-2 font-semibold text-gray-800">{doc.projectName}</td>
                                <td className="py-3 px-2">{doc.startDate}</td>
                                <td className="py-3 px-2 text-red-600 font-medium">{doc.expiryDate}</td>
                                <td className="py-3 px-2">{doc.owner}</td>
                                <td className="py-3 px-2">{getStatusBadge(doc.status)}</td>
                                <td className="py-3 px-2 text-center relative" ref={menuOpen === doc.id ? menuRef : null}>
                                    <button 
                                        onClick={() => setMenuOpen(menuOpen === doc.id ? null : doc.id)}
                                        className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200"
                                    >
                                        <FiMoreVertical />
                                    </button>
                                    {menuOpen === doc.id && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border">
                                            <ul className="py-1">
                                                {onRestore && (
                                                    <li>
                                                        <a
                                                            href="#"
                                                            onClick={(e) => handleActionClick(e, onRestore, doc.id)}
                                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            <FiShare className="mr-3" />
                                                            Bỏ lưu trữ
                                                        </a>
                                                    </li>
                                                )}
                                                {onDelete && (
                                                    <li>
                                                        <a
                                                            href="#"
                                                            onClick={(e) => handleActionClick(e, onDelete, doc.id)}
                                                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                                                        >
                                                            <FiTrash2 className="mr-3" />
                                                            Xoá vĩnh viễn
                                                        </a>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                         {documents.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-gray-500">Không có dữ liệu.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DocumentsTable;