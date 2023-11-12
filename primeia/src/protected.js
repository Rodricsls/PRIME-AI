import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.post('http://localhost:8888/verificarToken', {}, { headers: { Authorization: `Bearer ${token}` } });
        setIsAuthenticated(response.data.autenticacion);
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return null; // or return a loading spinner
  }

  return isAuthenticated ? children : <Navigate to="/" state={{ from: location }} />;
}

export default ProtectedRoute;