import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiUploadCloud, FiPaperclip } from 'react-icons/fi';

const AddPhaseForm = ({ project, onClose }) => {
    const [phases, setPhases] = useState([
        { name: '', responsiblePerson: '', startDate: '', endDate: '', details: '', files: [] }
    ]);

    const handleInputChange = (index, event) => {
        const values = [...phases];
        values[index][event.target.name] = event.target.value;
        setPhases(values);
    };
    
    const handleFileChange = (index, event) => {
        const values = [...phases];
        values[index].files = [...values[index].files, ...Array.from(event.target.files)];
        setPhases(values);
    };

    const handleRemoveFile = (phaseIndex, fileIndex) => {
        const values = [...phases];
        values[phaseIndex].files.splice(fileIndex, 1);
        setPhases(values);
    };

    const handleAddPhase = () => {
        setPhases([...phases, { name: '', responsiblePerson: '', startDate: '', endDate: '', details: '', files: [] }]);
    };

    const handleRemovePhase = (index) => {
        const values = [...phases];
        values.splice(index, 1);
        setPhases(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Tự động thêm tiền tố "Giai đoạn X:" vào tên mỗi giai đoạn khi lưu
        const phasesWithNumbers = phases.map((phase, index) => ({
            ...phase,
            name: `Giai đoạn ${index + 1}: ${phase.name}`
        }));

        console.log(`Adding phases to project ${project.id}:`, phasesWithNumbers);
        alert(`Đã thêm ${phases.length} giai đoạn cho dự án "${project.name}"! (Logic chưa được cài đặt)`);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
                Thêm giai đoạn cho dự án: <span className="font-bold">{project.name}</span>
            </h3>

            {phases.map((phase, index) => (
                <div key={index} className="p-4 border rounded-md relative space-y-4">
                     <h4 className="text-md font-semibold text-gray-800 border-b pb-2 mb-4">
                        Giai đoạn {index + 1}
                    </h4>
                     {phases.length > 1 && (
                        <button
                            type="button"
                            onClick={() => handleRemovePhase(index)}
                            className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 rounded-full"
                            title="Xóa giai đoạn này"
                        >
                            <FiTrash2 />
                        </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tên giai đoạn</label>
                            <input type="text" name="name" placeholder="Ví dụ: Khảo sát địa chất" value={phase.name} onChange={event => handleInputChange(index, event)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Người phụ trách</label>
                            <input type="text" name="responsiblePerson" value={phase.responsiblePerson} onChange={event => handleInputChange(index, event)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày bắt đầu</label>
                            <input type="date" name="startDate" value={phase.startDate} onChange={event => handleInputChange(index, event)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày kết thúc</label>
                            <input type="date" name="endDate" value={phase.endDate} onChange={event => handleInputChange(index, event)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700">Mô tả công việc</label>
                            <textarea name="details" value={phase.details} onChange={event => handleInputChange(index, event)} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                        </div>
                    </div>
                    {/* --- Tài liệu liên quan --- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tài liệu liên quan</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor={`file-upload-${index}`} className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                        <span>Tải lên một tệp</span>
                                        <input id={`file-upload-${index}`} name="files" type="file" className="sr-only" multiple onChange={e => handleFileChange(index, e)} />
                                    </label>
                                    <p className="pl-1">hoặc kéo và thả</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, PDF tối đa 10MB</p>
                            </div>
                        </div>
                        {phase.files.length > 0 && (
                            <div className="mt-4">
                                <ul>
                                    {phase.files.map((file, fileIndex) => (
                                        <li key={fileIndex} className="flex items-center justify-between text-sm text-gray-700 py-1 border-b">
                                            <div className="flex items-center">
                                                <FiPaperclip className="mr-2"/>
                                                <span>{file.name}</span>
                                            </div>
                                            <button type="button" onClick={() => handleRemoveFile(index, fileIndex)} className="text-red-500 hover:text-red-700">
                                                <FiTrash2 />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            
            <button
                type="button"
                onClick={handleAddPhase}
                className="flex items-center px-4 py-2 border border-dashed border-gray-400 text-gray-600 rounded-md hover:bg-gray-50"
            >
                <FiPlus className="mr-2" />
                Thêm giai đoạn khác
            </button>

            <div className="mt-8 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                    Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Lưu các giai đoạn
                </button>
            </div>
        </form>
    );
};

export default AddPhaseForm;