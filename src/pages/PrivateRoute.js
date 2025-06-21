import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PrivateRoute = ({ isLoggedIn, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication state
    const checkAuth = () => {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
      const storedUserId = localStorage.getItem("userId");
      const storedUserName = localStorage.getItem("userName");
      const storedUserEmail = localStorage.getItem("userEmail");

      // User is authenticated if all required data exists
      const authenticated = storedIsLoggedIn === "true" && 
                           storedUserId && 
                           storedUserName && 
                           storedUserEmail;

      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Update authentication state when isLoggedIn prop changes
  useEffect(() => {
    if (!isLoading) {
      setIsAuthenticated(isLoggedIn);
    }
  }, [isLoggedIn, isLoading]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/dashboard/login" replace />;
  }

  // Render protected content
  return children;
};

export default PrivateRoute;