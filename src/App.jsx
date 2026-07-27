import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'

import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Jobs from './pages/Jobs/Jobs'
import JobDetail from './pages/JobDetail/JobDetail'
import Companies from './pages/Company/Companies'
import CompanyDetail from './pages/Company/CompanyDetail'

import CandidateDashboard from './pages/Candidate/Dashboard'
import CandidateResume from './pages/Candidate/Resume'
import AppliedJobs from './pages/Candidate/AppliedJobs'
import SavedJobs from './pages/Candidate/SavedJobs'
import CandidateNotifications from './pages/Candidate/Notifications'

import EmployerDashboard from './pages/Employer/Dashboard'
import MyCompany from './pages/Employer/MyCompany'
import ManageJobs from './pages/Employer/ManageJobs'
import JobForm from './pages/Employer/JobForm'
import Applications from './pages/Employer/Applications'

import AdminDashboard from './pages/Admin/Dashboard'
import AdminUsers from './pages/Admin/ManageUsers'
import AdminJobs from './pages/Admin/ManageJobs'
import AdminCompanies from './pages/Admin/ManageCompanies'

const candidateLinks = [
  { to: '/candidate', label: 'ទិដ្ឋភាពទូទៅ', end: true },
  { to: '/candidate/resume', label: 'CV របស់ខ្ញុំ' },
  { to: '/candidate/applications', label: 'ពាក្យសុំការងារ' },
  { to: '/candidate/saved', label: 'ការងារបានរក្សាទុក' },
  { to: '/candidate/notifications', label: 'សេចក្តីជូនដំណឹង' },
]

const employerLinks = [
  { to: '/employer', label: 'ទិដ្ឋភាពទូទៅ', end: true },
  { to: '/employer/company', label: 'ក្រុមហ៊ុនរបស់ខ្ញុំ' },
  { to: '/employer/jobs', label: 'គ្រប់គ្រងការងារ' },
]

const adminLinks = [
  { to: '/admin', label: 'ទិដ្ឋភាពទូទៅ', end: true },
  { to: '/admin/users', label: 'អ្នកប្រើប្រាស់' },
  { to: '/admin/jobs', label: 'ការងារ' },
  { to: '/admin/companies', label: 'ក្រុមហ៊ុន' },
]

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<CompanyDetail />} />
          </Route>

          {/* Auth (no navbar/footer) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Candidate */}
          <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
            <Route element={<DashboardLayout title="បេក្ខជន" links={candidateLinks} />}>
              <Route path="/candidate" element={<CandidateDashboard />} />
              <Route path="/candidate/resume" element={<CandidateResume />} />
              <Route path="/candidate/applications" element={<AppliedJobs />} />
              <Route path="/candidate/saved" element={<SavedJobs />} />
              <Route path="/candidate/notifications" element={<CandidateNotifications />} />
            </Route>
          </Route>

          {/* Employer */}
          <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
            <Route element={<DashboardLayout title="និយោជក" links={employerLinks} />}>
              <Route path="/employer" element={<EmployerDashboard />} />
              <Route path="/employer/company" element={<MyCompany />} />
              <Route path="/employer/jobs" element={<ManageJobs />} />
              <Route path="/employer/jobs/new" element={<JobForm />} />
              <Route path="/employer/jobs/:id/edit" element={<JobForm />} />
              <Route path="/employer/jobs/:jobId/applicants" element={<Applications />} />
            </Route>
          </Route>

          {/* Admin */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<DashboardLayout title="អ្នកគ្រប់គ្រង" links={adminLinks} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/jobs" element={<AdminJobs />} />
              <Route path="/admin/companies" element={<AdminCompanies />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  )
}
