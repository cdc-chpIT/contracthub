import React from 'react';
import { FiFileText, FiUser } from 'react-icons/fi'; // Thêm icon FiUser
import { Link } from 'react-router-dom';

const RecentDocuments = () => {
    const documents = [
        { 
            id: 'doc001',
            name: 'Yêu cầu cấp bản vẽ cầu Trương Dương', 
            date: 'Hôm nay, 14:32', 
            expiryDate: 'Hết hạn: 30-12-2025',
            owner: 'Vũ Hồng Phúc' 
        },
        { 
            id: 'doc002',
            name: 'Bản vẽ thiết kế đường cao tốc Hà Nội - Lào Cai', 
            date: 'Hôm qua, 10:15',
            expiryDate: 'Hết hạn: 15-11-2025',
            owner: 'Trương Xuân Phương'
        },
        { 
            id: 'doc003',
            name: 'Hồ sơ thanh toán vật tư quý 3', 
            date: '20-08-2025, 09:00',
            expiryDate: 'Hết hạn: 25-09-2025',
            owner: 'Đặng Quang Thanh'
        },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">Tài liệu gần đây</h3>
                <a href="#" className="text-blue-600 text-sm font-semibold">Xem tất cả</a>
            </div>
            <ul>
                {documents.map((doc) => (
                    <li key={doc.id}>
                        <Link to={`/documents/${doc.id}`} className="block py-3 border-b last:border-b-0 hover:bg-gray-50 rounded-md -mx-2 px-2">
                            <div className="flex items-start">
                                <div className="p-2 bg-gray-100 rounded-lg mr-4">
                                    <FiFileText className="text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-700 leading-tight truncate">{doc.name}</p>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                       <FiUser className="mr-1" /> 
                                       <span>{doc.owner}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500 mt-1 whitespace-nowrap">
                                        <span>{doc.date}</span>
                                        <span className="mx-2">|</span>
                                        <span className="text-red-600">{doc.expiryDate}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentDocuments;