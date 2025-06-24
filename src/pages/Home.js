import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ setIsLoggedIn, setName, setEmail }) => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.removeItem(`selectedProject_${userId}`);
    }

    localStorage.removeItem("userId");
    localStorage.removeItem("userRoleId");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("projects");

    sessionStorage.clear();

    setIsLoggedIn(false);
    setName("");
    setEmail("");

    navigate("/login");
  }, [navigate, setIsLoggedIn, setName, setEmail]);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedUserId = localStorage.getItem("userId");

    if (!(storedIsLoggedIn === "true" && storedName && storedEmail && storedUserId)) {
      handleLogout();
    }
  }, [handleLogout]);

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Session Expired or Security Issue Detected
        </h1>
        <p className="text-gray-700 mb-6">
          For your safety, we’ve logged you out. Please log in again to continue using TesterAlly.
        </p>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all"
        >
          Logout & Login Again
        </button>
      </div>
    </div>
  );
};

export default Home;
