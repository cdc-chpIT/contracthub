import React, { useState, useMemo } from 'react';
import { FiCheckCircle, FiUploadCloud, FiEdit, FiLogIn, FiLogOut, FiFilter } from 'react-icons/fi';

const allActivities = [
    { id: 'act001', user: 'Vũ Hồng Phúc', action: 'đã phê duyệt tài liệu', document: 'Hợp đồng Xây dựng A12', time: '4 phút trước', type: 'Phê duyệt', icon: <FiCheckCircle className="text-green-500" /> },
    { id: 'act002', user: 'Trương Xuân Phương', action: 'đã tải lên một tài liệu mới', document: 'Phụ lục hợp đồng 02', time: '30 phút trước', type: 'Tải lên', icon: <FiUploadCloud className="text-blue-500" /> },
    { id: 'act003', user: 'Đặng Quang Thanh', action: 'đã cập nhật trạng thái', document: 'Hồ sơ nghiệm thu giai đoạn 1', time: '1 giờ trước', type: 'Cập nhật', icon: <FiEdit className="text-yellow-500" /> },
    { id: 'act004', user: 'ADMIN', action: 'đã đăng nhập vào hệ thống', document: '', time: '3 giờ trước', type: 'Đăng nhập', icon: <FiLogIn className="text-gray-500" /> },
    { id: 'act005', user: 'Vũ Hồng Phúc', action: 'đã đăng xuất', document: '', time: 'hôm qua', type: 'Đăng xuất', icon: <FiLogOut className="text-gray-500" /> },
];

const ActivityPage = () => {
    const [userFilter, setUserFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const users = useMemo(() => ['all', ...new Set(allActivities.map(a => a.user))], []);
    const types = useMemo(() => ['all', ...new Set(allActivities.map(a => a.type))], []);

    const filteredActivities = useMemo(() => {
        return allActivities.filter(activity => {
            const userMatch = userFilter === 'all' || activity.user === userFilter;
            const typeMatch = typeFilter === 'all' || activity.type === typeFilter;
            return userMatch && typeMatch;
        });
    }, [userFilter, typeFilter]);

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-800">Lịch sử hoạt động</h1>
                <p className="text-gray-500 mt-1">Theo dõi tất cả các hoạt động trên hệ thống.</p>
            </header>

            {/* --- Thanh Lọc --- */}
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                <FiFilter className="text-gray-500" />
                <div className="flex-1">
                    <label htmlFor="user-filter" className="text-sm font-medium text-gray-700 mr-2">Người dùng:</label>
                    <select 
                        id="user-filter" 
                        className="p-2 border border-gray-300 rounded-md shadow-sm"
                        value={userFilter}
                        onChange={(e) => setUserFilter(e.target.value)}
                    >
                        {users.map(user => (
                            <option key={user} value={user}>{user === 'all' ? 'Tất cả người dùng' : user}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <label htmlFor="type-filter" className="text-sm font-medium text-gray-700 mr-2">Loại hoạt động:</label>
                    <select 
                        id="type-filter" 
                        className="p-2 border border-gray-300 rounded-md shadow-sm"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        {types.map(type => (
                             <option key={type} value={type}>{type === 'all' ? 'Tất cả hoạt động' : type}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <ul className="space-y-4">
                    {filteredActivities.length > 0 ? filteredActivities.map((activity) => (
                        <li key={activity.id} className="flex items-start p-3 border-b last:border-b-0">
                            <div className="mr-4 mt-1 text-2xl">{activity.icon}</div>
                            <div>
                                <p className="text-sm text-gray-700">
                                    <span className="font-bold">{activity.user}</span>
                                    {` ${activity.action} `}
                                    {activity.document && <span className="font-semibold text-gray-800">{activity.document}</span>}
                                </p>
                                <p className="text-xs text-gray-400">{activity.time}</p>
                            </div>
                        </li>
                    )) : (
                        <p className="text-center text-gray-500 py-10">Không tìm thấy hoạt động nào.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ActivityPage;