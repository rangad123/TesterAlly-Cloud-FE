import { useEffect, useState } from "react";  
import UserIcon from "../images/user.png";

const Profile = () => {
  const name = localStorage.getItem("userName") || "User Name";
  const email = localStorage.getItem("userEmail") || "user@example.com";
  const userId = localStorage.getItem("userId");
  
  const [studioVersions, setStudioVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; 

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/";  
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchVersionDetails = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.testerally.ai/installer/track-download/?user_id=${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStudioVersions(data);
        } else if (response.status === 404) {
          setStudioVersions([]);
        } else {
          setError('Failed to fetch version details');
        }
      } catch (err) {
        setError('Error connecting to server');
        console.error('Error fetching version details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVersionDetails();
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-2xl">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-purple-600 mb-6 sm:mb-8">
          Profile
        </h1>

        {/* Profile Info */}
        <div className="text-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b-2 border-gray-100">
          <img
            alt="User Icon"
            src={UserIcon}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 sm:mb-5 border-4 border-purple-600 object-cover"
          />
          <h5 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            {name}
          </h5>
          <span className="text-sm sm:text-base text-gray-500">
            {email}
          </span>
        </div>

        {/* Studio Versions Section */}
        <div className="my-6 sm:my-8 py-4 sm:py-6 border-t-2 border-gray-100">
          <h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-4 sm:mb-6 text-center">
            Studio Versions
          </h3>

          {loading ? (
            <div className="text-center py-8 text-gray-500">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto mb-3"></div>
              <p>Loading version details...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          ) : studioVersions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No Studio version installed yet
            </div>
          ) : (
            <div className="space-y-4">
              {studioVersions.map((version, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-4 sm:p-5 hover:border-purple-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Version Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 pb-3 border-b border-gray-200 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">
                        Version:
                      </span>
                      <span className="text-base sm:text-lg font-bold text-purple-600 bg-white px-3 py-1 rounded-lg border border-purple-600">
                        {version.file_version}
                      </span>
                    </div>
                    {version.is_update_available === 'yes' && (
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide animate-pulse inline-block w-fit">
                        Update Available
                      </span>
                    )}
                  </div>

                  {/* Version Details */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1">
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">
                        OS:
                      </span>
                      <span className="text-xs sm:text-sm text-gray-800 font-semibold">
                        {version.os_name} {version.os_version}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1">
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">
                        Downloads:
                      </span>
                      <span className="text-xs sm:text-sm text-gray-800 font-semibold">
                        {version.download_count}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1">
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">
                        Last Active:
                      </span>
                      <span className="text-xs sm:text-sm text-gray-800 font-semibold">
                        {formatDate(version.last_downloaded)}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1">
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">
                        IP Address:
                      </span>
                      <span className="text-xs sm:text-sm text-gray-800 font-semibold">
                        {version.ip_address}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-gray-100">
          <a
            href="addfriend"
            className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg text-center font-semibold hover:bg-purple-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            Add Friend
          </a>
          <a
            href="message"
            className="flex-1 bg-white text-purple-600 py-3 px-6 rounded-lg text-center font-semibold border-2 border-purple-600 hover:bg-purple-600 hover:text-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            Message
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;