import React from 'react';
import SummaryCard from '../components/dashboard/SummaryCard';
import PendingDocumentsTable from '../components/dashboard/PendingDocumentsTable';
import DocumentsSummaryChart from '../components/dashboard/DocumentsSummaryChart';
import { FiUsers, FiBriefcase, FiFileText } from 'react-icons/fi';


const DashboardPage = () => {
  // Dữ liệu này sẽ được lấy từ Redux store
  const summaryData = [
    { title: 'Departments', value: '5 Members', icon: <FiBriefcase /> },
    { title: 'Members', value: '24 Members', icon: <FiUsers /> },
    { title: 'Documents', value: '12,097 files', icon: <FiFileText /> },
  ];

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
          + New Document
        </button>
      </header>
      
      {/* Hàng chứa các thẻ tóm tắt */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {summaryData.map(item => <SummaryCard key={item.title} {...item} />)}
      </div>

      {/* Grid chính chứa các component con */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <PendingDocumentsTable />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <DocumentsSummaryChart />
        </div>
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
          {/* Recent Documents Component */}
        </div>
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
          {/* Analysis Chart Component */}
        </div>
         <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
          {/* Analysis Chart Component */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;