import React, { useState, useMemo } from 'react';
import { FiBox, FiClock, FiCheckSquare, FiPauseCircle, FiThumbsUp, FiFileText, FiChevronRight, FiPlus } from 'react-icons/fi';
import StatusCard from '../components/documents/StatusCard'; // Tái sử dụng component StatusCard

// --- Dữ liệu mẫu cho các dự án ---
const allProjects = [
    { id: 'P-001', name: 'Dự án Cầu Vượt Sông Hồng', status: 'Đang triển khai', documentCount: 5, manager: 'Vũ Hồng Phúc' },
    { id: 'P-002', name: 'Thiết kế Cao tốc Bắc Nam', status: 'Hoàn thành', documentCount: 12, manager: 'Trương Xuân Phương' },
    { id: 'P-003', name: 'Cung cấp vật tư Quý 3', status: 'Hoàn thành', documentCount: 8, manager: 'Đặng Quang Thanh' },
    { id: 'P-004', name: 'Tư vấn giám sát công trình', status: 'Chờ phê duyệt', documentCount: 2, manager: 'Vũ Hồng Phúc' },
    { id: 'P-005', name: 'Bảo trì hệ thống điện', status: 'Tạm dừng', documentCount: 3, manager: 'Trương Xuân Phương' },
    { id: 'P-006', name: 'Nâng cấp nhà máy xử lý nước', status: 'Đang triển khai', documentCount: 7, manager: 'Đặng Quang Thanh' },
];

// --- Component Bảng Dự án (tách riêng để tái sử dụng) ---
const ProjectsTable = ({ title, projects }) => {
    const getStatusBadge = (status) => {
        const statusMap = {
          'Đang triển khai': 'bg-blue-100 text-blue-800',
          'Hoàn thành': 'bg-green-100 text-green-800',
          'Chờ phê duyệt': 'bg-yellow-100 text-yellow-800',
          'Tạm dừng': 'bg-purple-100 text-purple-800',
        };
        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusMap[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-gray-800">{title}</h3>
                <a href="#" className="text-blue-600 text-sm font-semibold">Xem tất cả</a>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-gray-500 border-b">
                            <th className="py-3 px-2">Mã Dự án</th>
                            <th className="py-3 px-2">Tên Dự án</th>
                            <th className="py-3 px-2 w-40">Trạng thái</th> {/* Tăng độ rộng cột trạng thái */}
                            <th className="py-3 px-2">Số lượng hồ sơ</th>
                            <th className="py-3 px-2">Quản lý dự án</th>
                            <th className="py-3 px-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                <td className="py-3 px-2 font-mono text-xs">{project.id}</td>
                                <td className="py-3 px-2 font-semibold text-gray-800">{project.name}</td>
                                <td className="py-3 px-2">{getStatusBadge(project.status)}</td>
                                <td className="py-3 px-2 text-center">{project.documentCount}</td>
                                <td className="py-3 px-2">{project.manager}</td>
                                <td className="py-3 px-2 text-center">
                                    <button className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200">
                                        <FiChevronRight />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">Không có dự án nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const ProjectsPage = () => {
    const [activeFilter, setActiveFilter] = useState('Tất cả');

    const statusList = useMemo(() => [
        { title: 'Tất cả', icon: <FiBox size={20}/>, color: 'gray', count: allProjects.length },
        { title: 'Đang triển khai', icon: <FiClock size={20}/>, color: 'blue', count: allProjects.filter(p => p.status === 'Đang triển khai').length },
        { title: 'Hoàn thành', icon: <FiCheckSquare size={20}/>, color: 'green', count: allProjects.filter(p => p.status === 'Hoàn thành').length },
        { title: 'Chờ phê duyệt', icon: <FiThumbsUp size={20}/>, color: 'yellow', count: allProjects.filter(p => p.status === 'Chờ phê duyệt').length },
        { title: 'Tạm dừng', icon: <FiPauseCircle size={20}/>, color: 'purple', count: allProjects.filter(p => p.status === 'Tạm dừng').length },
    ], []);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'Tất cả') {
            return allProjects;
        }
        return allProjects.filter(p => p.status === activeFilter);
    }, [activeFilter]);
    
    // Lọc dự án theo từng trạng thái cụ thể
    const inProgressProjects = allProjects.filter(p => p.status === 'Đang triển khai');
    const completedProjects = allProjects.filter(p => p.status === 'Hoàn thành');
    const pendingProjects = allProjects.filter(p => p.status === 'Chờ phê duyệt');
    const pausedProjects = allProjects.filter(p => p.status === 'Tạm dừng');

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Quản lý Dự án</h1>
                    <p className="text-gray-500 mt-1">Theo dõi và quản lý tất cả các dự án.</p>
                </div>
                <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 flex items-center">
                  <FiPlus className="mr-2" />
                  <span>Tạo Dự án mới</span>
                </button>
            </header>

            {/* --- Card Trạng Thái Dự Án --- */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {statusList.map(status => (
                    <StatusCard 
                        key={status.title}
                        title={status.title}
                        value={status.count}
                        icon={status.icon}
                        color={status.color}
                        isActive={activeFilter === status.title}
                        onClick={() => setActiveFilter(status.title)}
                    />
                ))}
            </div>
            
            {/* --- Bảng Dự Án Mới Nhất (có lọc) --- */}
            <ProjectsTable title="Các dự án mới nhất" projects={filteredProjects} />

            {/* --- Các Bảng Dự Án Theo Trạng Thái Cụ Thể --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProjectsTable title="Dự án đang triển khai" projects={inProgressProjects} />
                <ProjectsTable title="Dự án đã hoàn thành" projects={completedProjects} />
                <ProjectsTable title="Dự án chờ phê duyệt" projects={pendingProjects} />
                <ProjectsTable title="Dự án tạm dừng" projects={pausedProjects} />
            </div>
        </div>
    );
};

export default ProjectsPage;