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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/admin" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/report" element={<ReportForm />} />
            <Route path="/reports" element={<ReportList />} />
            <Route path="/report/template" element={<ReportTemplateForm />} />
            <Route path="/report/templates" element={<ReportTemplateList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
