// import { Avatar, Dropdown, Navbar } from "flowbite-react";
// import UserIcon from "../images/user.png";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// const AppNavBar = (props) => {
//   let navigate = useNavigate();

//   const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail } = props;

//   // Handle Logout
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setName(null);
//     setEmail(null);
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("name");
//     localStorage.removeItem("email");
//     navigate("/");
//     toast.success("You are successfully logged out!");
//   };

//   // On component mount, check if user is logged in using localStorage
//   useEffect(() => {
//     const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
//     const storedName = localStorage.getItem("name");
//     const storedEmail = localStorage.getItem("email");

//     if (storedIsLoggedIn === "true") {
//       setIsLoggedIn(true);
//       setName(storedName);
//       setEmail(storedEmail);
//     }
//   }, [setIsLoggedIn, setName, setEmail]);

//   console.log("isLoggedIn in AppNavBar:", isLoggedIn);

//   return (
//     <div className="py-2">
//       <Navbar fluid>
//         <Navbar.Brand>
//           <img
//             src="logo.png"
//             className="mr-3 h-6 sm:h-9"
//             alt="Flowbite React Logo"
//           />
//           <span className="self-center whitespace-nowrap text-3xl font-bold dark:text-white bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
//             TesterAlly
//           </span>
//         </Navbar.Brand>

//         {isLoggedIn && (
//           <div className="flex md:order-2">
//             <Dropdown
//               arrowIcon={false}
//               inline
//               label={
//                 <Avatar
//                   alt="User settings"
//                   img={UserIcon}
//                   className="h-10 w-10"
//                   rounded
//                 />
//               }
//             >
//               <Dropdown.Header>
//                 <span className="block text-sm">{name}</span>
//                 <span className="block truncate text-sm font-medium">{email}</span>
//               </Dropdown.Header>
//               <Dropdown.Divider />
//               <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
//             </Dropdown>
//           </div>
//         )}
//       </Navbar>
//     </div>
//   );
// };

// export default AppNavBar;

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import UserIcon from "../images/user.png";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { FaTimes } from "react-icons/fa";
import "./AppNavBar.css"

import "./AppNavBar.css";

const AppNavBar = (props) => {
  let navigate = useNavigate();
  let location = useLocation();

  const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail } = props;

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.removeItem(`selectedProject_${userId}`);
    }
    localStorage.removeItem("userId");

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    sessionStorage.removeItem("sessionActive");
    localStorage.removeItem("projects");

    setIsLoggedIn(false);
    setName("");
    setEmail("");

    navigate("/dashboard/login");
    toast.success("You are successfully logged out!");
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      setName(storedName);
      setEmail(storedEmail);
    }
  }, [setIsLoggedIn, setName, setEmail]);

  console.log("isLoggedIn in AppNavBar:", isLoggedIn);

  const currentEmail = email || localStorage.getItem("userEmail") || "No email";

  const handleLogoClick = () => {
    if (!isLoggedIn) {
      navigate("/");
    }
  };

  const [showBookDemo, setShowBookDemo] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookDemoSubmit = (e) => {
    e.preventDefault();
    console.log('Book Demo Form Data:', formData);
    // Handle form submission here
    setShowBookDemo(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      reason: ''
    });
  };


  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="py-2">
      <Navbar fluid>
        <Navbar.Brand>
          <img
            src="/logo2.png"
            className="mr-3 h-8 sm:h-12 logo-img"
            alt="Flowbite React Logo"
            onClick={handleLogoClick}
          />
          <span className="self-center whitespace-nowrap text-3xl font-bold brand-text">
            TesterAlly
          </span>
        </Navbar.Brand>

        {/* If Admin is logged in, show centered blue links */}
        {isAdminRoute && isLoggedIn && (
          <div className="flex-1 flex justify-center space-x-8 admin-nav-container">
            <Link
              to="/admin-dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              <DashboardIcon />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <Link
              to="/admin-organization"
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"

            >
              <CorporateFareIcon/>
              <span className="hidden md:inline">Organization</span>
            </Link>
            <Link
              to="/admin-setting"
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
              data-name="SettingPanel"
            >
              <AdminPanelSettingsIcon/>
              <span className="hidden md:inline">Settings</span>
            </Link>
          </div>
        )}

        {isAdminRoute ? (
          isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Dropdown
                arrowIcon={true}
                inline
                label={
                  <Avatar
                    alt="Admin settings"
                    img={UserIcon}
                    className="h-10 w-10"
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">Admin</span>
                  <span className="block truncate text-sm font-medium">
                    {currentEmail}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
              </Dropdown>
            </div>
          ) : null
        ) : isLoggedIn ? (
          <div className="flex items-center space-x-4">

            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={UserIcon}
                  className="h-10 w-10"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{name}</span>
                <span className="block truncate text-sm font-medium">
                  {currentEmail}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <div className="text-sm/6 font-semibold text-gray-900 auth-buttons">

            <button 
              onClick={() => setShowBookDemo(true)}
              className="bg-purple-600 hover:bg-purple-400 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Book a Demo
            </button>

            <button
              onClick={() => navigate("/dashboard/login")}
              className="login-button"
            >
              Login<span aria-hidden="true">&rarr;</span>
            </button>
            
          </div>
        )}
      </Navbar>

      {/* Book Demo Modal */}
      {showBookDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-purple-600/30 rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-black">Book a Demo</h3>
              <button 
                onClick={() => setShowBookDemo(false)}
                className="text-gray-600 hover:text-black transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            
            <div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:border-purple-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:border-purple-600"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Business Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:border-purple-600"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91-98765-43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:border-purple-600"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">What is the primary reason you are here?</label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="gray-600-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:border-purple-600"
                    required
                  >
                    <option value="">Select a reason</option>
                    <option value="evaluate-testing-tools">Evaluate testing tools</option>
                    <option value="improve-test-automation">Improve test automation</option>
                    <option value="scale-testing-team">Scale testing team</option>
                    <option value="reduce-testing-time">Reduce testing time</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowBookDemo(false)}
                  className="flex-1 border border-gray-400 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBookDemoSubmit}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
                >
                  Book Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AppNavBar;