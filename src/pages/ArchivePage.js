import React from 'react';
import DocumentsTable from '../components/documents/DocumentsTable'; // Tái sử dụng component DocumentsTable
import { FiArchive } from 'react-icons/fi';

const archivedDocuments = [
    { id: 'HD-OLD-001', projectName: 'Dự án khu đô thị Tây Hồ', startDate: '01-01-2022', expiryDate: '31-12-2023', owner: 'Vũ Hồng Phúc', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-002', projectName: 'Xây dựng cầu vượt biển', startDate: '15-03-2021', expiryDate: '15-09-2023', owner: 'Trương Xuân Phương', status: 'Đã thanh lý/Quyết toán' },
    { id: 'HD-OLD-003', projectName: 'Cung cấp thiết bị y tế', startDate: '01-07-2020', expiryDate: '01-07-2022', owner: 'Đặng Quang Thanh', status: 'Hủy' },
];

const ArchivePage = () => {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-800">Lưu trữ</h1>
                <p className="text-gray-500 mt-1">Danh sách các hồ sơ, tài liệu đã được lưu trữ.</p>
            </header>

            <DocumentsTable title="Hồ sơ đã lưu trữ" documents={archivedDocuments} />
        </div>
    );
};

export default ArchivePage;