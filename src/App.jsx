import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AmbientBackground } from './components/AmbientBackground.jsx';
import { BottomNavigation } from './components/BottomNavigation.jsx';
import { FloatingNavbar } from './components/FloatingNavbar.jsx';

const Analytics = lazy(() => import('./pages/Analytics.jsx').then(m => ({ default: m.Analytics })));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx').then(m => ({ default: m.Dashboard })));
const DeviceDetail = lazy(() => import('./pages/DeviceDetail.jsx').then(m => ({ default: m.DeviceDetail })));
const Devices = lazy(() => import('./pages/Devices.jsx').then(m => ({ default: m.Devices })));
const Rooms = lazy(() => import('./pages/Rooms.jsx').then(m => ({ default: m.Rooms })));
const Security = lazy(() => import('./pages/Security.jsx').then(m => ({ default: m.Security })));
const Settings = lazy(() => import('./pages/Settings.jsx').then(m => ({ default: m.Settings })));

export default function App() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <AmbientBackground />
      <FloatingNavbar />
      <AnimatePresence mode={isMobile ? 'popLayout' : 'wait'}>
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/device/:deviceId" element={<DeviceDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/security" element={<Security />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <BottomNavigation />
    </>
  );
}
