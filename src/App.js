import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';
import ProjectsPage from './pages/ProjectsPage';
import ActivityPage from './pages/ActivityPage'; 
import ArchivePage from './pages/ArchivePage';   

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar
          isExpanded={isSidebarExpanded}
          setIsExpanded={setIsSidebarExpanded}
        />

        <main
          className={`flex-1 p-8 transition-[margin-left] duration-300 ease-in-out transform-gpu will-change-[margin-left] ${isSidebarExpanded ? 'ml-56' : 'ml-20'}`}
        >
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/archive" element={<ArchivePage />} />   
            {/* Thêm các route khác ở đây nếu cần */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;