import React, { useState, useMemo } from 'react';
import { FiBox, FiClock, FiCheckSquare, FiPauseCircle, FiThumbsUp, FiChevronRight, FiPlus } from 'react-icons/fi';
import StatusCard from '../components/documents/StatusCard';
import Modal from '../components/common/Modal';
import ProjectTree from '../components/projects/ProjectTree';
import ConfirmationModal from '../components/common/ConfirmationModal';
import AddPhaseForm from '../components/projects/AddPhaseForm';

// --- Dữ liệu mẫu cho các dự án (đã cập nhật ngày tháng cho giai đoạn) ---
const allProjects = [
    { 
        id: 'P-001', 
        name: 'Dự án Cầu Vượt Sông Hồng', 
        status: 'Đang triển khai', 
        startDate: '01-06-2025',
        documentCount: 5, 
        manager: 'Vũ Hồng Phúc', 
        category: 'Đấu thầu xây dựng', 
        investmentCost: '1,200,000,000',
        phases: [
            { id: 'P001-1', name: 'Giai đoạn 1: Khảo sát địa chất', status: 'Hoàn thành', startDate: '01-06-2025', endDate: '30-06-2025', details: 'Thu thập dữ liệu, phân tích mẫu đất, và lập báo cáo khảo sát.', responsiblePerson: 'Nguyễn Văn A', files: ['Báo cáo khảo sát địa chất.pdf', 'Kết quả thí nghiệm đất.xlsx'] },
            { id: 'P001-2', name: 'Giai đoạn 2: Thiết kế kỹ thuật', status: 'Hoàn thành', startDate: '01-07-2025', endDate: '31-08-2025', details: 'Hoàn thành bản vẽ chi tiết và thông số kỹ thuật cho dự án.', responsiblePerson: 'Trần Thị B', files: ['Bản vẽ cầu.dwg', 'Thuyết minh thiết kế.docx'] },
            { id: 'P001-3', name: 'Giai đoạn 3: Thi công móng cọc', status: 'Đang triển khai', startDate: '01-09-2025', endDate: '30-11-2025', details: 'Đang tiến hành ép cọc và xây dựng nền móng.', responsiblePerson: 'Lê Văn C', files: ['Nhật ký thi công cọc.pdf'] },
            { id: 'P001-4', name: 'Giai đoạn 4: Xây dựng thân cầu', status: 'Chưa bắt đầu', startDate: '01-12-2025', endDate: '30-05-2026', details: 'Dự kiến bắt đầu vào tháng 10/2025.', responsiblePerson: 'Phạm Thị D', files: [] },
        ]
    },
    { 
        id: 'P-002', 
        name: 'Thiết kế Cao tốc Bắc Nam', 
        status: 'Hoàn thành', 
        startDate: '15-05-2025',
        documentCount: 12, 
        manager: 'Trương Xuân Phương', 
        category: 'Tư vấn thiết kế', 
        investmentCost: '850,000,000',
        phases: [
            { id: 'P002-1', name: 'Giai đoạn 1: Lập kế hoạch', status: 'Hoàn thành', startDate: '15-05-2025', endDate: '14-06-2025', details: 'Xác định phạm vi và yêu cầu thiết kế.', responsiblePerson: 'Nguyễn Thị E', files: ['Kế hoạch tổng thể.pdf'] },
            { id: 'P002-2', name: 'Giai đoạn 2: Thiết kế cơ sở', status: 'Hoàn thành', startDate: '15-06-2025', endDate: '15-09-2025', details: 'Hoàn thành các bản vẽ và tài liệu thiết kế cơ sở.', responsiblePerson: 'Trần Văn G', files: ['Bản vẽ thiết kế cơ sở.dwg', 'Hồ sơ pháp lý.pdf'] },
            { id: 'P002-3', name: 'Giai đoạn 3: Bàn giao', status: 'Hoàn thành', startDate: '16-09-2025', endDate: '30-09-2025', details: 'Bàn giao toàn bộ hồ sơ thiết kế cho chủ đầu tư.', responsiblePerson: 'Lê Thị H', files: ['Biên bản bàn giao.pdf'] },
        ]
    },
    { id: 'P-003', name: 'Cung cấp vật tư Quý 3', status: 'Hoàn thành', startDate: '01-07-2025', documentCount: 8, manager: 'Đặng Quang Thanh', category: 'Cung cấp vật tư', investmentCost: '300,000,000', phases: [] },
    { id: 'P-004', name: 'Tư vấn giám sát công trình', status: 'Chờ phê duyệt', startDate: '20-08-2025', documentCount: 2, manager: 'Vũ Hồng Phúc', category: 'Tư vấn giám sát', investmentCost: '150,000,000', phases: [] },
    { id: 'P-005', name: 'Bảo trì hệ thống điện', status: 'Tạm dừng', startDate: '10-08-2025', documentCount: 3, manager: 'Trương Xuân Phương', category: 'Bảo trì', investmentCost: '50,000,000', phases: [] },
    { id: 'P-006', name: 'Nâng cấp nhà máy xử lý nước', status: 'Đang triển khai', startDate: '01-09-2025', documentCount: 7, manager: 'Đặng Quang Thanh', category: 'Đấu thầu xây dựng', investmentCost: '2,500,000,000', phases: [] },
];

const ProjectsTable = ({ title, projects, onRowClick }) => {
    // ... (rest of the component is unchanged)
    const getStatusBadge = (status) => {
        const statusMap = {
          'Đang triển khai': 'bg-blue-100 text-blue-800',
          'Hoàn thành': 'bg-green-100 text-green-800',
          'Chờ phê duyệt': 'bg-yellow-100 text-yellow-800',
          'Tạm dừng': 'bg-purple-100 text-purple-800',
          'Chưa bắt đầu': 'bg-gray-100 text-gray-800',
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
                            <th className="py-3 px-2">Danh mục</th>
                            <th className="py-3 px-2">Chi phí đầu tư (VND)</th>
                            <th className="py-3 px-2 w-40">Trạng thái</th>
                            <th className="py-3 px-2">Số lượng hồ sơ</th>
                            <th className="py-3 px-2">Quản lý dự án</th>
                            <th className="py-3 px-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr 
                                key={project.id} 
                                className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                                onClick={() => onRowClick(project)}
                            >
                                <td className="py-3 px-2 font-mono text-xs">{project.id}</td>
                                <td className="py-3 px-2 font-semibold text-gray-800">{project.name}</td>
                                <td className="py-3 px-2">{project.category}</td>
                                <td className="py-3 px-2 text-left">{project.investmentCost}</td>
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
                                <td colSpan="8" className="text-center py-10 text-gray-500">Không có dự án nào.</td>
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
    const [selectedProjectForTree, setSelectedProjectForTree] = useState(null);
    const [projectForPhaseAddition, setProjectForPhaseAddition] = useState(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isAddPhaseModalOpen, setIsAddPhaseModalOpen] = useState(false);


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

    const handleProjectClick = (project) => {
        if (project.phases && project.phases.length > 0) {
            setSelectedProjectForTree(project);
        } else {
            setProjectForPhaseAddition(project);
            setIsConfirmationModalOpen(true);
        }
    };
    
    const handleConfirmAddPhase = () => {
        setIsConfirmationModalOpen(false);
        setIsAddPhaseModalOpen(true);
    };

    const handleCloseAddPhase = () => {
        setIsAddPhaseModalOpen(false);
        setProjectForPhaseAddition(null);
    };

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
            
            <ProjectsTable title="Các dự án mới nhất" projects={filteredProjects} onRowClick={handleProjectClick} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProjectsTable title="Dự án đang triển khai" projects={inProgressProjects} onRowClick={handleProjectClick} />
                <ProjectsTable title="Dự án đã hoàn thành" projects={completedProjects} onRowClick={handleProjectClick} />
                <ProjectsTable title="Dự án chờ phê duyệt" projects={pendingProjects} onRowClick={handleProjectClick} />
                <ProjectsTable title="Dự án tạm dừng" projects={pausedProjects} onRowClick={handleProjectClick} />
            </div>

            <Modal 
                isOpen={!!selectedProjectForTree} 
                onClose={() => setSelectedProjectForTree(null)}
                title="Sơ đồ Giai đoạn Dự án"
                maxWidth="6xl"
            >
                {selectedProjectForTree && (
                    <ProjectTree 
                        project={selectedProjectForTree}
                    />
                )}
            </Modal>

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleConfirmAddPhase}
                title="Dự án chưa có giai đoạn"
            >
                Dự án "{projectForPhaseAddition?.name}" hiện chưa có thông tin giai đoạn. Bạn có muốn thêm mới không?
            </ConfirmationModal>

            <Modal
                isOpen={isAddPhaseModalOpen}
                onClose={handleCloseAddPhase}
                title="Thêm giai đoạn mới"
                maxWidth="4xl"
            >
                {projectForPhaseAddition && (
                    <AddPhaseForm project={projectForPhaseAddition} onClose={handleCloseAddPhase} />
                )}
            </Modal>
        </div>
    );
};

export default ProjectsPage;