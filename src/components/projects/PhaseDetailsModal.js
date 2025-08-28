import React from 'react';
import Modal from '../common/Modal'; // Đảm bảo bạn có component Modal này
import { FiUser, FiCalendar, FiFileText, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

const PhaseDetailsModal = ({ isOpen, onClose, phase }) => {
  if (!phase) return null;

  const isCompleted = phase.status === 'Hoàn thành';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Chi tiết Giai đoạn: ${phase.name}`}>
      <div className="space-y-4 text-gray-700">
        <div>
          <h3 className="font-bold text-lg mb-2">Thông tin chung</h3>
          <p className="flex items-center mb-1">
            <FiUser className="mr-2 text-indigo-500" />
            <span className="font-semibold">Người phụ trách:</span> {phase.responsiblePerson}
          </p>
          <p className="flex items-center mb-1">
            {isCompleted ? (
              <FiCheckCircle className="mr-2 text-green-500" />
            ) : (
              <FiClock className="mr-2 text-blue-500" />
            )}
            <span className="font-semibold">Trạng thái:</span> {phase.status}
          </p>
          <p className="flex items-start mb-1">
            <FiCalendar className="mr-2 text-gray-500 mt-1" />
            <span className="font-semibold">Mô tả:</span> {phase.details}
          </p>
        </div>

        {phase.files && phase.files.length > 0 && (
          <div>
            <h3 className="font-bold text-lg mb-2 mt-4">Tài liệu liên quan</h3>
            <ul className="list-disc list-inside space-y-1">
              {phase.files.map((file, index) => (
                <li key={index} className="flex items-center">
                  <FiFileText className="mr-2 text-purple-500" />
                  <span>{file}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {phase.files && phase.files.length === 0 && (
          <div className="text-center py-4 text-gray-500 italic">
            <FiXCircle className="inline-block mr-2" />
            Không có tài liệu nào được đính kèm cho giai đoạn này.
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PhaseDetailsModal;