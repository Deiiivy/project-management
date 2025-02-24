import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './Home/Home';
import Index from './page/Index/Index.jsx';
import Singin from './Auth/Singin/Singin';
import Login from './Auth/Login/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './utils/AuthContext';
import CreateTask from './page/createTask/CreateTask.jsx';
import Navbar from './navbar/Navbar.jsx';
import IndexGroup from './groups/indexGroup/IndexGroup.jsx';

function App() {
  return (
    <>
    <AuthProvider>
        <Router>
    <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/singin" element={<Singin />} />
          <Route path="/index" element={<ProtectedRoute element={<Index />} />} />
          <Route path='/CreateTask' element={<ProtectedRoute element={<CreateTask />} />} />
          <Route path='/Group' element={<ProtectedRoute element={<IndexGroup />} />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
    </>
  )
}

export default App

