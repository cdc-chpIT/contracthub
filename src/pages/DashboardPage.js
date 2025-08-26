import React from 'react';
import SummaryCard from '../components/dashboard/SummaryCard';
import PendingDocumentsTable from '../components/dashboard/PendingDocumentsTable';
import DocumentsSummaryChart from '../components/dashboard/DocumentsSummaryChart';
import RecentDocuments from '../components/dashboard/RecentDocuments';
import RecentActivities from '../components/dashboard/RecentActivities';
import AnalysisChart from '../components/dashboard/AnalysisChart';
import { FiUsers, FiBriefcase, FiFileText, FiBox } from 'react-icons/fi';

const DashboardPage = () => {
  const summaryData = [
    { title: 'Phòng ban', value: '5 thành viên', icon: <FiBriefcase size={20}/> },
    { title: 'Thành viên', value: '24 thành viên', icon: <FiUsers size={20}/> },
    { title: 'Đơn vị', value: '3 đơn vị', icon: <FiBox size={20}/> },
    { title: 'Tài liệu', value: '12,097 tệp', icon: <FiFileText size={20}/> },
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Bảng điều khiển</h1>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center">
          + <span className="ml-2">Tài liệu mới</span>
        </button>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map(item => <SummaryCard key={item.title} {...item} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <PendingDocumentsTable />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <DocumentsSummaryChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <RecentDocuments />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <RecentActivities />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <AnalysisChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;