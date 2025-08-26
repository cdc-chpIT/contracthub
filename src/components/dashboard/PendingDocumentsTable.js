import React from 'react';

const PendingDocumentsTable = () => {
    const documents = [
        { name: 'Đơn xin nghỉ', class: 'Chờ phê duyệt', startDate: '23/08/2025', dueDate: '01/09/2025', owner: 'Vũ Hồng Phúc' },
        { name: 'Đơn xin làm online', class: 'Chờ phê duyệt', startDate: '23/08/2025', dueDate: '27/08/2025', owner: 'Trương Xuân Phương' },
        { name: 'Đơn xin cấp dụng cụ', class: 'Chờ phê duyệt', startDate: '23/08/2025', dueDate: '28/08/2025', owner: 'Đặng Quang Thanh' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Hồ sơ đang chờ duyệt</h3>
                <a href="#" className="text-blue-600 text-sm">Xem tất cả</a>
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr className="text-gray-500 text-sm">
                        <th className="py-2">Tên File</th>
                        <th className="py-2">Trạng thái</th>
                        <th className="py-2">Ngày tạo file</th>
                        <th className="py-2">Ngày hết hạn</th>
                        <th className="py-2">Chủ sở hữu</th>
                        <th className="py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-3">{doc.name}</td>
                            <td className="py-3">{doc.class}</td>
                            <td className="py-3">{doc.dueDate}</td>
                            <td className="py-3 flex items-center">
                                <span className="ml-2">{doc.owner}</span>
                            </td>
                            <td className="py-3">
                                <a href="#" className="text-blue-600 font-semibold">Chi tiết</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PendingDocumentsTable;