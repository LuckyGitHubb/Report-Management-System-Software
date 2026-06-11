import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReportForm from './components/ReportManagementSystem/ReportManagment/ReportForm'
import ReportList from './components/ReportManagementSystem/ReportManagment/ReportList'
import ReportTemplateForm from './components/ReportManagementSystem/ReportTemplateManagement/ReportTemplateForm'
import ReportTemplateList from './components/ReportManagementSystem/ReportTemplateManagement/ReportTemplateList'
import Dashboard from './components/ReportManagementSystem/DashboardManagement/Dashboard'
import Layout from './components/Layout/Layout'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import AuthProvider from './context/AuthProvider'
import UserList from './components/ReportManagementSystem/UserManagement/UserList'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'
import PublicRoute from './routes/PublicRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <AuthProvider>

          <Routes>
            <Route path="/" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>

            } />
            <Route path="/login/admin" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route
              path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/report" element={<ReportForm />} />
              <Route path="/reports" element={<ReportList />} />

              <Route path="/users"
                element={
                  <AdminRoute>
                    <UserList />
                  </AdminRoute>
                } />
              <Route path="/report/template" element={<ReportTemplateForm />} />
              <Route path="/report/templates" element={<ReportTemplateList />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
