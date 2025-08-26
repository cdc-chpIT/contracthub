import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <Router>
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
            {/* Thêm các route khác ở đây nếu cần */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;