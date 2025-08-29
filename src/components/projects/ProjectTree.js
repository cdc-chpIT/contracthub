import React, { useState, useEffect } from 'react';
import { FiCalendar, FiUser, FiFileText, FiCheckCircle, FiClock, FiXCircle, FiDollarSign, FiGrid, FiActivity, FiClipboard } from 'react-icons/fi';

// Hàm hỗ trợ để xác định màu cho mũi tên dựa trên trạng thái
const getStatusArrowColor = (status, isSelected) => {
    switch (status) {
        case 'Hoàn thành':
            return isSelected ? 'bg-gray-600 text-white' : 'bg-gray-400 text-white';
        case 'Đang triển khai':
            return isSelected ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white';
        case 'Chưa bắt đầu':
            return isSelected ? 'bg-sky-500 text-white' : 'bg-sky-300 text-sky-900';
        default:
            return isSelected ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-700';
    }
};


const ProjectTree = ({ project }) => {
    const [selectedPhase, setSelectedPhase] = useState(null);

    useEffect(() => {
        if (project && project.phases && project.phases.length > 0) {
            const inProgressPhase = project.phases.find(p => p.status === 'Đang triển khai');
            setSelectedPhase(inProgressPhase || project.phases[0]);
        }
    }, [project]);

    if (!project) return null;

    // Component con để hiển thị chi tiết giai đoạn
    const PhaseDetails = ({ phase }) => {
        if (!phase) return <div className="mt-8 text-center text-gray-500">Chọn một giai đoạn để xem chi tiết.</div>;
        
        const isCompleted = phase.status === 'Hoàn thành';

        return (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200 animate-fade-in">
                <h3 className="font-bold text-xl mb-4 text-gray-800">{phase.name}</h3>
                <div className="space-y-3 text-gray-700">
                    <p className="flex items-center"><FiUser className="mr-3 text-indigo-500" />
                        <span className="font-semibold w-32">Người phụ trách:</span>
                        <span>{phase.responsiblePerson}</span>
                    </p>
                    <p className="flex items-center">
                        {isCompleted ? <FiCheckCircle className="mr-3 text-green-500" /> : <FiClock className="mr-3 text-blue-500" />}
                        <span className="font-semibold w-32">Trạng thái:</span>
                        <span>{phase.status}</span>
                    </p>
                    <p className="flex items-center"><FiCalendar className="mr-3 text-gray-500" />
                        <span className="font-semibold w-32">Ngày bắt đầu:</span>
                        <span>{phase.startDate}</span>
                    </p>
                     <p className="flex items-center"><FiCalendar className="mr-3 text-gray-500" />
                        <span className="font-semibold w-32">Ngày kết thúc:</span>
                        <span>{phase.endDate}</span>
                    </p>
                    <p className="flex items-start"><FiClipboard className="mr-3 text-gray-500 mt-1" />
                        <span className="font-semibold w-32">Mô tả công việc:</span>
                        <span className="flex-1">{phase.details}</span>
                    </p>
                    
                    {phase.files && phase.files.length > 0 && (
                        <div>
                            <h4 className="font-bold text-lg mb-2 mt-4">Tài liệu liên quan</h4>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                {phase.files.map((file, index) => (
                                <li key={index} className="flex items-center text-gray-600">
                                    <FiFileText className="mr-2 text-purple-500" />
                                    <span>{file}</span>
                                </li>
                                ))}
                            </ul>
                        </div>
                    )}
            
                    {(!phase.files || phase.files.length === 0) && (
                        <div className="text-center py-4 text-gray-500 italic mt-4"><FiXCircle className="inline-block mr-2" />Không có tài liệu nào.</div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="font-sans">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-indigo-500 -mt-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{project.name}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-600">
                    <p className="flex items-center"><FiCalendar className="mr-2 text-gray-400" /><strong>Ngày bắt đầu:</strong>&nbsp;{project.startDate || 'N/A'}</p>
                    <p className="flex items-center"><FiUser className="mr-2 text-gray-400" /><strong>Quản lý:</strong>&nbsp;{project.manager}</p>
                    <p className="flex items-center"><FiActivity className="mr-2 text-gray-400" /><strong>Trạng thái:</strong>&nbsp;{project.status}</p>
                    <p className="flex items-center"><FiGrid className="mr-2 text-gray-400" /><strong>Danh mục:</strong>&nbsp;{project.category}</p>
                    <p className="flex items-center"><FiDollarSign className="mr-2 text-gray-400" /><strong>Chi phí:</strong>&nbsp;{project.investmentCost} VND</p>
                </div>
            </div>

            <div className="flex items-center justify-center flex-wrap gap-4 px-4">
                {project.phases?.map((phase) => {
                    const isSelected = selectedPhase && selectedPhase.id === phase.id;
                    const colorClasses = getStatusArrowColor(phase.status, isSelected);

                    return (
                        <div
                            key={phase.id}
                            className={`relative h-24 flex-shrink-0 flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 z-10 ${isSelected ? 'z-20 scale-110 shadow-lg' : 'shadow-md'}`}
                            style={{ 
                                clipPath: 'polygon(0% 0%, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0% 100%, 20px 50%)',
                                width: '220px'
                            }}
                            onClick={() => setSelectedPhase(phase)}
                        >
                            <div className={`w-full h-full flex flex-col items-center justify-center py-2 px-8 text-center rounded-sm ${colorClasses}`}>
                                <p className="font-bold text-sm leading-tight">{phase.name}</p>
                                <p className="text-xs mt-1 opacity-90 font-medium">{phase.status}</p>
                                <p className="text-[10px] mt-1 opacity-80 whitespace-nowrap">
                                    {phase.startDate} - {phase.endDate}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <PhaseDetails phase={selectedPhase} />

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ProjectTree;