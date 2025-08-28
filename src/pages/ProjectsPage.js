import React, { useState, useMemo } from 'react';
import { FiBox, FiClock, FiCheckSquare, FiPauseCircle, FiThumbsUp, FiChevronRight, FiPlus, FiUser, FiFileText, FiCalendar, FiXCircle, FiCheckCircle } from 'react-icons/fi';
import StatusCard from '../components/documents/StatusCard';
import Modal from '../components/common/Modal';
import ProjectTree from '../components/projects/ProjectTree';

// --- Dữ liệu mẫu cho các dự án ---
const allProjects = [
    { 
        id: 'P-001', 
        name: 'Dự án Cầu Vượt Sông Hồng', 
        status: 'Đang triển khai', 
        documentCount: 5, 
        manager: 'Vũ Hồng Phúc', 
        category: 'Đấu thầu xây dựng', 
        investmentCost: '1,200,000,000',
        phases: [
            { id: 'P001-1', name: 'Giai đoạn 1: Khảo sát địa chất', status: 'Hoàn thành', details: 'Thu thập dữ liệu, phân tích mẫu đất, và lập báo cáo khảo sát.', responsiblePerson: 'Nguyễn Văn A', files: ['Báo cáo khảo sát địa chất.pdf', 'Kết quả thí nghiệm đất.xlsx'] },
            { id: 'P001-2', name: 'Giai đoạn 2: Thiết kế kỹ thuật', status: 'Hoàn thành', details: 'Hoàn thành bản vẽ chi tiết và thông số kỹ thuật cho dự án.', responsiblePerson: 'Trần Thị B', files: ['Bản vẽ cầu.dwg', 'Thuyết minh thiết kế.docx'] },
            { id: 'P001-3', name: 'Giai đoạn 3: Thi công móng cọc', status: 'Đang triển khai', details: 'Đang tiến hành ép cọc và xây dựng nền móng.', responsiblePerson: 'Lê Văn C', files: ['Nhật ký thi công cọc.pdf'] },
            { id: 'P001-4', name: 'Giai đoạn 4: Xây dựng thân cầu', status: 'Chưa bắt đầu', details: 'Dự kiến bắt đầu vào tháng 10/2025.', responsiblePerson: 'Phạm Thị D', files: [] },
        ]
    },
    { 
        id: 'P-002', 
        name: 'Thiết kế Cao tốc Bắc Nam', 
        status: 'Hoàn thành', 
        documentCount: 12, 
        manager: 'Trương Xuân Phương', 
        category: 'Tư vấn thiết kế', 
        investmentCost: '850,000,000',
        phases: [
            { id: 'P002-1', name: 'Giai đoạn 1: Lập kế hoạch', status: 'Hoàn thành', details: 'Xác định phạm vi và yêu cầu thiết kế.', responsiblePerson: 'Nguyễn Thị E', files: ['Kế hoạch tổng thể.pdf'] },
            { id: 'P002-2', name: 'Giai đoạn 2: Thiết kế cơ sở', status: 'Hoàn thành', details: 'Hoàn thành các bản vẽ và tài liệu thiết kế cơ sở.', responsiblePerson: 'Trần Văn G', files: ['Bản vẽ thiết kế cơ sở.dwg', 'Hồ sơ pháp lý.pdf'] },
            { id: 'P002-3', name: 'Giai đoạn 3: Bàn giao', status: 'Hoàn thành', details: 'Bàn giao toàn bộ hồ sơ thiết kế cho chủ đầu tư.', responsiblePerson: 'Lê Thị H', files: ['Biên bản bàn giao.pdf'] },
        ]
    },
    { id: 'P-003', name: 'Cung cấp vật tư Quý 3', status: 'Hoàn thành', documentCount: 8, manager: 'Đặng Quang Thanh', category: 'Cung cấp vật tư', investmentCost: '300,000,000', phases: [] },
    { id: 'P-004', name: 'Tư vấn giám sát công trình', status: 'Chờ phê duyệt', documentCount: 2, manager: 'Vũ Hồng Phúc', category: 'Tư vấn giám sát', investmentCost: '150,000,000', phases: [] },
    { id: 'P-005', name: 'Bảo trì hệ thống điện', status: 'Tạm dừng', documentCount: 3, manager: 'Trương Xuân Phương', category: 'Bảo trì', investmentCost: '50,000,000', phases: [] },
    { id: 'P-006', name: 'Nâng cấp nhà máy xử lý nước', status: 'Đang triển khai', documentCount: 7, manager: 'Đặng Quang Thanh', category: 'Đấu thầu xây dựng', investmentCost: '2,500,000,000', phases: [] },
];

const PhaseDetailsModal = ({ isOpen, onClose, phase }) => {
    if (!phase) return null;
  
    const isCompleted = phase.status === 'Hoàn thành';
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={`Chi tiết: ${phase.name}`} maxWidth="lg">
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold text-lg mb-2">Thông tin chung</h3>
            <p className="flex items-center mb-1"><FiUser className="mr-2 text-indigo-500" /><span className="font-semibold">Người phụ trách:</span>&nbsp;{phase.responsiblePerson}</p>
            <p className="flex items-center mb-1">
              {isCompleted ? <FiCheckCircle className="mr-2 text-green-500" /> : <FiClock className="mr-2 text-blue-500" />}
              <span className="font-semibold">Trạng thái:</span>&nbsp;{phase.status}
            </p>
            <p className="flex items-start mb-1"><FiCalendar className="mr-2 text-gray-500 mt-1" /><span className="font-semibold">Mô tả:</span>&nbsp;{phase.details}</p>
          </div>
  
          {phase.files && phase.files.length > 0 && (
            <div>
              <h3 className="font-bold text-lg mb-2 mt-4">Tài liệu liên quan</h3>
              <ul className="list-disc list-inside space-y-1">
                {phase.files.map((file, index) => (
                  <li key={index} className="flex items-center"><FiFileText className="mr-2 text-purple-500" /><span>{file}</span></li>
                ))}
              </ul>
            </div>
          )}
  
          {(!phase.files || phase.files.length === 0) && (
            <div className="text-center py-4 text-gray-500 italic"><FiXCircle className="inline-block mr-2" />Không có tài liệu nào.</div>
          )}
        </div>
      </Modal>
    );
};

const ProjectsTable = ({ title, projects, onRowClick }) => {
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
    const [selectedPhaseForDetails, setSelectedPhaseForDetails] = useState(null);

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
            alert(`Dự án "${project.name}" chưa có thông tin giai đoạn.`);
        }
    };

    const handlePhaseClick = (phase) => {
        setSelectedPhaseForDetails(phase);
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
                        onPhaseClick={handlePhaseClick} 
                    />
                )}
            </Modal>
            
            <PhaseDetailsModal
                isOpen={!!selectedPhaseForDetails}
                onClose={() => setSelectedPhaseForDetails(null)}
                phase={selectedPhaseForDetails}
            />
        </div>
    );
};

export default ProjectsPage;