import React from 'react';

const AddDocumentForm = ({ onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thêm hợp đồng thành công! (logic chưa được cài đặt)');
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mã hợp đồng</label>
                    <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tên dự án/hợp đồng</label>
                    <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tên đối tác/khách hàng</label>
                    <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Nhân sự phụ trách</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                        <option>Vũ Hồng Phúc</option>
                        <option>Trương Xuân Phương</option>
                        <option>Đặng Quang Thanh</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ngày ký</label>
                    <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Ngày hết hạn</label>
                    <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                    Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Lưu Hợp đồng
                </button>
            </div>
        </form>
    );
};

export default AddDocumentForm;