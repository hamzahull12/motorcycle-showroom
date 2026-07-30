import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/public/HomePage'
import CatalogPage from '../pages/public/CatalogPage'
import PublicLayout from '../components/layout/PublicLayout'
import MotorcycleDetailPage from '../pages/public/MotorcycleDetailPage'
import LoginPage from '../pages/admin/LoginPage'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import AdminLayout from '../components/layout/AdminLayout'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<CatalogPage />} />
          <Route
            path="/catalog/:id"
            element={<MotorcycleDetailPage />}
          />
        </Route>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;
