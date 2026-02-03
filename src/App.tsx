import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

// Placeholder components for future implementation
const Vaults = () => <div className="p-8 text-white">Vaults Page (Coming Soon)</div>;
const Members = () => <div className="p-8 text-white">Members Page (Coming Soon)</div>;
const AuditLogs = () => <div className="p-8 text-white">Audit Logs Page (Coming Soon)</div>;
const Settings = () => <div className="p-8 text-white">Settings Page (Coming Soon)</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="vaults" element={<Vaults />} />
        <Route path="members" element={<Members />} />
        <Route path="audit" element={<AuditLogs />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
