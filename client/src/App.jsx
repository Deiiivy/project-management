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
import CreateGroup from './groups/createGroup/CreateGroup.jsx'
import Footer from './footer/Footer.jsx';
import UpdateTask from './page/updateTask/UpdateTask.jsx';
import IndexTask from './groups/indexTask/IndexTask.jsx'
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null)
  return (
    <>
    <AuthProvider>
        <Router>
    <Navbar name={user} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login setUser={setUser} />} />
          <Route path="/singin" element={<Singin />} />
          <Route path="/index" element={<ProtectedRoute element={<Index />} />} />
          <Route path='/CreateTask' element={<ProtectedRoute element={<CreateTask />} />} />
          <Route path='/Group' element={<ProtectedRoute element={<IndexGroup />} />} />
          <Route path='/CreateGroup' element={<ProtectedRoute element={<CreateGroup />} />} />
          <Route path='/UpdateTask/:id' element={<ProtectedRoute element={<UpdateTask />} />} />
          <Route path='/IndexTask' element={<ProtectedRoute element={<IndexTask />} />} />
        </Routes>
      </div>
        <Footer />
    </Router>
    </AuthProvider>
    </>
  )
}

export default App

