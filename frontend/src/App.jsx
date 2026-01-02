import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import SiteLayout from './components/layouts/SiteLayout'
import FullScreenCenter from './components/layouts/FullScreenCenter'
import DashboardLayout from './components/layouts/DashboardLayout'

import Landingpage from "./pages/landingpage"
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoansPage from './pages/LoansPage'
import BookDetailPage from './pages/BookDetailPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import BookAdminPage from './pages/BookAdminPage'
import AddBookPage from './pages/AddBookPage'
import EditBookPage from './pages/EditBookPage'
import UsersAdminPage from './pages/UsersAdminPage'
import LoansAdminPage from './pages/LoansAdminPage'
import AddUserPage from './pages/AddUserPage'
import LoanRegisterPage from './pages/LoanRegisterPage'

// Crear la instancia
const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<SiteLayout><Landingpage /></SiteLayout>} />
        <Route path='/about' element={<SiteLayout><AboutPage /></SiteLayout>} />
        <Route path='/contact' element={<SiteLayout><ContactPage /></SiteLayout>} />
        <Route path='/book/:id' element={<SiteLayout><BookDetailPage /></SiteLayout>} />
        <Route path='/loans' element={<SiteLayout><LoansPage /></SiteLayout>} />
        <Route path='/login' element={<FullScreenCenter><LoginPage /></FullScreenCenter>} />
        <Route path='/dashboard' element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path='/dashboard/books' element={<DashboardLayout><BookAdminPage /></DashboardLayout>} />
        <Route path='/dashboard/books/detail/:id' element={<DashboardLayout><BookDetailPage /></DashboardLayout>} />
        <Route path='/dashboard/books/edit' element={<DashboardLayout><EditBookPage /></DashboardLayout>} />
        <Route path='/dashboard/books/add' element={<DashboardLayout><AddBookPage /></DashboardLayout>} />
        <Route path='/dashboard/users' element={<DashboardLayout><UsersAdminPage /></DashboardLayout>} />
        <Route path='/dashboard/users/add' element={<DashboardLayout><AddUserPage /></DashboardLayout>} />
        <Route path='/dashboard/loans' element={<DashboardLayout><LoansAdminPage /></DashboardLayout>} />
        <Route path='/dashboard/loans/add' element={<DashboardLayout><LoanRegisterPage /></DashboardLayout>} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
