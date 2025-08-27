import React, { useState, useMemo } from 'react';
import StatusCard from '../components/documents/StatusCard';
import DocumentsTable from '../components/documents/DocumentsTable';
import Modal from '../components/common/Modal';
import AddDocumentForm from '../components/documents/AddDocumentForm';
import { 
    FiFileText, FiClock, FiCheckSquare, FiXCircle, 
    FiEdit, FiPenTool, FiThumbsUp, FiDollarSign, FiPlus
} from 'react-icons/fi';

const allDocuments = [
    { id: 'HD-001', projectName: 'Dự án Cầu Vượt Sông Hồng', startDate: '01-06-2025', expiryDate: '30-12-2025', owner: 'Vũ Hồng Phúc', status: 'Đang triển khai' },
    { id: 'HD-002', projectName: 'Thiết kế Cao tốc Bắc Nam', startDate: '15-05-2025', expiryDate: '15-11-2025', owner: 'Trương Xuân Phương', status: 'Đang triển khai' },
    { id: 'HD-003', projectName: 'Cung cấp vật tư Quý 3', startDate: '01-07-2025', expiryDate: '25-09-2025', owner: 'Đặng Quang Thanh', status: 'Hoàn thành' },
    { id: 'HD-004', projectName: 'Tư vấn giám sát công trình', startDate: '20-08-2025', expiryDate: '01-02-2026', owner: 'Vũ Hồng Phúc', status: 'Chờ phê duyệt' },
    { id: 'HD-005', projectName: 'Bảo trì hệ thống điện', startDate: '10-08-2025', expiryDate: '10-10-2025', owner: 'Trương Xuân Phương', status: 'Hoàn thành' },
    { id: 'HD-006', projectName: 'Xây dựng nhà xưởng mới', startDate: '01-03-2025', expiryDate: '05-06-2026', owner: 'Đặng Quang Thanh', status: 'Hủy' },
    { id: 'HD-007', projectName: 'Soạn thảo hợp đồng gói thầu A', startDate: '18-08-2025', expiryDate: '30-09-2025', owner: 'Vũ Hồng Phúc', status: 'Soạn thảo' },
    { id: 'HD-008', projectName: 'Hợp đồng quảng cáo 2025', startDate: '02-09-2025', expiryDate: '31-12-2025', owner: 'Đặng Quang Thanh', status: 'Chờ ký' },
    { id: 'HD-009', projectName: 'Thanh lý hợp đồng kho bãi', startDate: '01-01-2025', expiryDate: '01-09-2025', owner: 'Trương Xuân Phương', status: 'Đã thanh lý/Quyết toán' },
];

const DocumentsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Tất cả');

    const statusList = [
        { title: 'Tất cả', icon: <FiFileText size={20}/>, color: 'gray' },
        { title: 'Soạn thảo', icon: <FiEdit size={20}/>, color: 'gray' },
        { title: 'Chờ phê duyệt', icon: <FiThumbsUp size={20}/>, color: 'yellow' },
        { title: 'Chờ ký', icon: <FiPenTool size={20}/>, color: 'orange' },
        { title: 'Đang triển khai', icon: <FiClock size={20}/>, color: 'blue' },
        { title: 'Thanh toán', icon: <FiDollarSign size={20}/>, color: 'teal' },
        { title: 'Hoàn thành', icon: <FiCheckSquare size={20}/>, color: 'green' },
        { title: 'Hủy', icon: <FiXCircle size={20}/>, color: 'red' },
    ];

    const filteredDocuments = useMemo(() => {
        if (activeFilter === 'Tất cả') {
            return allDocuments;
        }
        return allDocuments.filter(doc => doc.status === activeFilter);
    }, [activeFilter]);

    const pendingApprovalDocs = allDocuments.filter(d => d.status === 'Chờ phê duyệt');
    const pendingSignatureDocs = allDocuments.filter(d => d.status === 'Chờ ký');

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Quản lý Hồ sơ & Hợp đồng</h1>
                    <p className="text-gray-500 mt-1">Tổng quan và tra cứu tất cả các tài liệu quan trọng.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 flex items-center"
                >
                  <FiPlus className="mr-2" />
                  <span>Thêm Hợp đồng</span>
                </button>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {statusList.map(status => (
                    <StatusCard 
                        key={status.title}
                        title={status.title}
                        value={status.title === 'Tất cả' ? allDocuments.length : allDocuments.filter(d => d.status === status.title).length}
                        icon={status.icon}
                        color={status.color}
                        isActive={activeFilter === status.title}
                        onClick={() => setActiveFilter(status.title)}
                    />
                ))}
            </div>
            
            <DocumentsTable title="Hồ sơ mới nhất" documents={filteredDocuments} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DocumentsTable title="Hồ sơ chờ phê duyệt" documents={pendingApprovalDocs} />
                <DocumentsTable title="Hồ sơ chờ ký" documents={pendingSignatureDocs} />
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Tạo Hợp đồng / Hồ sơ mới"
            >
                <AddDocumentForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default DocumentsPage;