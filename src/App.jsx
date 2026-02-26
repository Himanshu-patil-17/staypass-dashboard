import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profiles from './pages/Profiles';
import Hostels from './pages/Hostels';
import LeaveRequests from './pages/LeaveRequests';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<div>Dashboard Home</div>} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="hostels" element={<Hostels />} />
          <Route path="leaverequests" element={<LeaveRequests />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;