import React, { useState } from 'react';
import DocumentsTable from '../components/documents/DocumentsTable';
import Pagination from '../components/common/Pagination';

const initialArchivedDocuments = [
    { id: 'HD-OLD-001', projectName: 'Dự án khu đô thị Tây Hồ', startDate: '01-01-2022', expiryDate: '31-12-2023', owner: 'Vũ Hồng Phúc', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-002', projectName: 'Xây dựng cầu vượt biển', startDate: '15-03-2021', expiryDate: '15-09-2023', owner: 'Trương Xuân Phương', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-003', projectName: 'Cung cấp thiết bị y tế', startDate: '01-07-2020', expiryDate: '01-07-2022', owner: 'Đặng Quang Thanh', status: 'Hủy' },
    { id: 'HD-OLD-004', projectName: 'Hợp đồng bảo trì phần mềm 2021', startDate: '01-02-2021', expiryDate: '31-01-2022', owner: 'Vũ Hồng Phúc', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-005', projectName: 'Thi công nội thất văn phòng', startDate: '10-05-2022', expiryDate: '10-08-2022', owner: 'Trương Xuân Phương', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-006', projectName: 'Tổ chức sự kiện cuối năm', startDate: '01-12-2023', expiryDate: '31-12-2023', owner: 'Đặng Quang Thanh', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-007', projectName: 'Hợp đồng vận chuyển hàng hóa', startDate: '05-04-2021', expiryDate: '05-04-2023', owner: 'Vũ Hồng Phúc', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-008', projectName: 'Nâng cấp hệ thống mạng', startDate: '01-11-2022', expiryDate: '01-02-2023', owner: 'Trương Xuân Phương', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-009', projectName: 'Tư vấn luật lao động', startDate: '01-01-2023', expiryDate: '30-06-2023', owner: 'Đặng Quang Thanh', status: 'Hủy' },
    { id: 'HD-OLD-010', projectName: 'Hợp đồng thuê mặt bằng', startDate: '01-01-2020', expiryDate: '31-12-2022', owner: 'Vũ Hồng Phúc', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-011', projectName: 'Dự án phim tài liệu', startDate: '15-02-2022', expiryDate: '15-10-2023', owner: 'Trương Xuân Phương', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-012', projectName: 'Cung cấp suất ăn công nghiệp', startDate: '01-03-2021', expiryDate: '28-02-2022', owner: 'Đặng Quang Thanh', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-013', projectName: 'Thiết kế bộ nhận diện thương hiệu', startDate: '10-01-2023', expiryDate: '10-03-2023', owner: 'Vũ Hồng Phúc', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-014', projectName: 'Hợp đồng quảng cáo truyền hình', startDate: '01-09-2022', expiryDate: '31-12-2022', owner: 'Trương Xuân Phương', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-015', projectName: 'Bảo hiểm tài sản 2022', startDate: '01-01-2022', expiryDate: '31-12-2022', owner: 'Đặng Quang Thanh', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-016', projectName: 'Xây dựng website thương mại', startDate: '01-06-2021', expiryDate: '01-10-2021', owner: 'Vũ Hồng Phúc', status: 'Hủy' },
    { id: 'HD-OLD-017', projectName: 'Hợp đồng dịch vụ kế toán', startDate: '01-01-2023', expiryDate: '31-12-2023', owner: 'Trương Xuân Phương', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-018', projectName: 'Cung cấp cây xanh văn phòng', startDate: '15-07-2022', expiryDate: '14-07-2023', owner: 'Đặng Quang Thanh', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-019', projectName: 'Dịch vụ kiểm toán 2021', startDate: '10-10-2021', expiryDate: '10-01-2022', owner: 'Vũ Hồng Phúc', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-020', projectName: 'Hợp đồng đào tạo nhân sự', startDate: '01-04-2023', expiryDate: '30-06-2023', owner: 'Trương Xuân Phương', status: 'Hủy' },
];

const ArchivePage = () => {
    const [archivedDocs, setArchivedDocs] = useState(initialArchivedDocuments);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const handleRestore = (docId) => {
        // Lọc ra tài liệu cần khôi phục và cập nhật lại state
        const restoredDoc = archivedDocs.find(doc => doc.id === docId);
        alert(`Đã khôi phục tài liệu "${restoredDoc.projectName}". (Logic chuyển trang chưa được cài đặt)`);
        setArchivedDocs(currentDocs => currentDocs.filter(doc => doc.id !== docId));
    };
    
    const handleDelete = (docId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn tài liệu này không? Hành động này không thể hoàn tác.')) {
            setArchivedDocs(currentDocs => currentDocs.filter(doc => doc.id !== docId));
        }
    };
    
    // Tính toán lại dữ liệu cho trang hiện tại sau khi có thể đã xóa
    const totalPages = Math.ceil(archivedDocs.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDocuments = archivedDocs.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    // Điều chỉnh trang hiện tại nếu trang cuối cùng bị xóa hết
    if (currentDocuments.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
    
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-800">Lưu trữ</h1>
                <p className="text-gray-500 mt-1">Danh sách các hồ sơ, tài liệu đã được lưu trữ.</p>
            </header>

            <div className="bg-white rounded-lg shadow">
                 <DocumentsTable
                    title="Hồ sơ đã lưu trữ"
                    documents={currentDocuments}
                    showViewAllLink={false} 
                    onDelete={handleDelete}
                    onRestore={handleRestore}
                />
                <div className="p-4 border-t border-gray-200">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ArchivePage;