import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './Home/Home';
import Index from './page/Index';
import Singin from './Auth/Singin/Singin';
import Login from './Auth/Login/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './utils/AuthContext';

function App() {
  return (
    <>
    <AuthProvider>
        <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/singin" element={<Singin />} />
          <Route path="/index" element={<ProtectedRoute element={<Index />} />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
    </>
  )
}

export default App

