import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
// import các trang khác...

function App() {
  return (
    <Router>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            {/* <Route path="/documents" element={<DocumentsPage />} /> */}
            {/* ... các route khác ... */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;