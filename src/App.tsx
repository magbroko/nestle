import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RoleProvider } from './context/RoleContext'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { ModulePage } from './pages/ModulePage'
import { QRScanPage } from './pages/QRScanPage'

export default function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<DashboardPage />} />
          <Route path="/app/module/:moduleId" element={<ModulePage />} />
          <Route path="/scan" element={<QRScanPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  )
}
