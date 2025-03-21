import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/Login" />;
};

export default ProtectedRoute;