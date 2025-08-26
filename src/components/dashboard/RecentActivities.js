import React from 'react';
import { FiCheckCircle, FiUploadCloud, FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const RecentActivities = () => {
    // Dữ liệu mẫu với các tên và hành động bằng tiếng Việt
    const activities = [
        { 
            id: 'act001',
            user: 'Vũ Hồng Phúc', 
            action: 'đã phê duyệt tài liệu', 
            document: 'Hợp đồng Xây dựng A12', 
            time: '4 phút trước',
            icon: <FiCheckCircle className="text-green-500" size={20}/>
        },
        { 
            id: 'act002',
            user: 'Trương Xuân Phương', 
            action: 'đã tải lên một tài liệu mới', 
            document: 'Phụ lục hợp đồng 02', 
            time: '30 phút trước',
            icon: <FiUploadCloud className="text-blue-500" size={20}/>
        },
        { 
            id: 'act003',
            user: 'Đặng Quang Thanh', 
            action: 'đã cập nhật trạng thái', 
            document: 'Hồ sơ nghiệm thu giai đoạn 1', 
            time: '1 giờ trước',
            icon: <FiEdit className="text-yellow-500" size={20}/>
        },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">Hoạt động gần đây</h3>
                <a href="#" className="text-blue-600 text-sm font-semibold">Xem tất cả</a>
            </div>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>
                        <Link to={`/activity/${activity.id}`} className="block py-3 border-b last:border-b-0 hover:bg-gray-50 rounded-md -mx-2 px-2">
                            <div className="flex items-start">
                                <div className="mr-4 mt-1">
                                    {activity.icon}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">
                                        <span className="font-bold">{activity.user}</span>
                                        {` ${activity.action} `}
                                        <span className="font-semibold text-gray-800">{activity.document}</span>
                                    </p>
                                    <p className="text-xs text-gray-400">{activity.time}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivities;