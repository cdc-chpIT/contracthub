import React from 'react';
import { FiFileText, FiUser, FiCheckCircle, FiClock, FiBox } from 'react-icons/fi';

const ProjectTree = ({ project, onPhaseClick }) => {
  if (!project) return null;

  return (
    <div className="font-sans py-4 px-2">
      <div className="flex flex-col items-center">
        {/* Nút gốc: Dự án Tổng */}
        <div className="relative mb-16">
          <div className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg text-2xl z-10 relative">
            {project.name}
          </div>
          {/* Đường nối thẳng đứng từ nút gốc */}
          <div className="absolute top-full left-1/2 w-0.5 h-16 bg-gray-300 transform -translate-x-1/2"></div>
        </div>

        {/* Cụm các giai đoạn */}
        <div className="relative w-full">
          {/* Container cho các giai đoạn, sử dụng Flexbox để căn giữa */}
          <div className="flex justify-center items-start gap-8 px-4">
            {project.phases?.map((phase, index) => {
              const isCompleted = phase.status === 'Hoàn thành';
              const cardBgColor = isCompleted ? 'bg-gray-100' : 'bg-white';
              const textColor = isCompleted ? 'text-gray-500' : 'text-gray-800';
              const borderColor = isCompleted ? 'border-gray-300' : 'border-blue-500';

              const isFirst = index === 0;
              const isLast = index === project.phases.length - 1;

              return (
                <div key={phase.id} className="relative flex flex-col items-center pt-16 w-60">
                  {/* Đường nối từ thanh ngang lên thẻ giai đoạn */}
                  <div className="absolute top-0 left-1/2 w-0.5 h-16 bg-gray-300 transform -translate-x-1/2"></div>

                  {/* ĐƯỜNG NỐI NGANG ĐÃ SỬA LỖI */}
                  {/* Mỗi đoạn ngang sẽ dài bằng 50% thẻ + 1rem (nửa khoảng trống gap-8) */}
                  {!isFirst && (
                    <div className="absolute top-0 right-1/2 w-[calc(50%+1rem)] h-0.5 bg-gray-300"></div>
                  )}
                  {!isLast && (
                    <div className="absolute top-0 left-1/2 w-[calc(50%+1rem)] h-0.5 bg-gray-300"></div>
                  )}

                  <div 
                    className={`w-full p-4 rounded-lg shadow-lg border-t-4 ${borderColor} cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${cardBgColor} z-10`}
                    onClick={() => onPhaseClick(phase)}
                  >
                    <h3 className={`font-bold text-base text-center mb-3 ${textColor} ${isCompleted ? 'line-through' : ''}`}>
                      {phase.name}
                    </h3>
                    
                    <div className={`space-y-2 text-sm ${textColor}`}>
                      <div className="flex items-center">
                        <FiUser size={14} className="mr-2 flex-shrink-0 text-gray-400" />
                        <span className="truncate">{phase.responsiblePerson}</span>
                      </div>
                      <div className="flex items-center">
                        {isCompleted ? (
                          <FiCheckCircle size={14} className="mr-2 flex-shrink-0 text-green-500" />
                        ) : (
                          <FiClock size={14} className="mr-2 flex-shrink-0 text-blue-500" />
                        )}
                        <span>{phase.status}</span>
                      </div>
                      {phase.files && phase.files.length > 0 && (
                        <div className="flex items-center">
                          <FiFileText size={14} className="mr-2 flex-shrink-0 text-gray-400" />
                          <span>{phase.files.length} tệp</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTree;