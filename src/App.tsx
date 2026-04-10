import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import DashboardPage from './pages/DashboardPage'
import ItemsPage from './pages/ItemsPage'
import ResellersPage from './pages/ResellersPage'
import ResellerDetailPage from './pages/ResellerDetailPage'
import TransactionsPage from './pages/TransactionsPage'
import BackupPage from './pages/BackupPage'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/resellers" element={<ResellersPage />} />
          <Route path="/resellers/:id" element={<ResellerDetailPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/backup" element={<BackupPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
