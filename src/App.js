import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MustockLandingPage from './components/MustockLandingPage';
import ImprovedMustockDashboard from './components/ImprovedMustockDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MustockLandingPage />} />
        <Route path="/dashboard" element={<ImprovedMustockDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
