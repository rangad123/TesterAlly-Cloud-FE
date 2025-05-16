import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const MemberDetails = () => {
  const [members, setMembers] = useState([]);
  const [memberDetails, setMemberDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const { projectId } = useParams(); 
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchMembers = async () => {
      if (!projectId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`https://api.testerally.ai/api/projects/${projectId}/members/`, {
          params: { 
            project_id: projectId,
            user_id: userId
          },
        });
        
        setMembers(response.data || []);
      } catch (err) {
        console.error("Error fetching project members:", err);
        setError(err.response?.data?.message || "Failed to fetch members");
      } finally {
        setLoading(false);
      }
    };
    
    fetchMembers();
  }, [projectId, userId]);
  
  // Function to fetch member details when a member is clicked
  const fetchMemberDetails = async (member) => {
    try {
      setLoading(true);
      setSelectedMember(member);
      
      // Only proceed if the invitation has been accepted
      if (member.invitation_status === "Accepted") {
        const response = await axios.post(
          `https://api.testerally.ai/api/project-member-details/`,
          { email_id: member.email }
        );
        
        console.log("API response:", response.data);
        
        if (response.data) {
          setMemberDetails({
            user: response.data.user,
            projects: response.data.projects || [],
            exe_downloads: response.data.exe_downloads || []
          });
          setError(null);
        } else {
          setError('No member details returned from API.');
        }
      }
    } catch (err) {
      console.error('Failed to fetch member details:', err);
      // More detailed error logging
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        setError(`Failed to load member details. Server responded with status ${err.response.status}.`);
      } else if (err.request) {
        console.error("Error request:", err.request);
        setError('Failed to load member details. No response received from server.');
      } else {
        console.error("Error message:", err.message);
        setError(`Failed to load member details. Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedMember(null);
    setMemberDetails(null);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };
  
  const handleMemberClick = (member) => {
    fetchMemberDetails(member);
  };
  
  if (loading && members.length === 0 && !selectedMember) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-600">Loading members...</div>
      </div>
    );
  }

  if (error && members.length === 0 && !selectedMember) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold">Project Members</h2>
        {selectedMember && (
          <button 
            onClick={handleBack}
            className="flex items-center text-purple-600 hover:text-purple-800 mt-2"
          >
            <FaArrowLeft className="mr-2" /> Back to Members List
          </button>
        )}
      </div>
      
      {selectedMember ? (
        selectedMember.invitation_status !== "Accepted" ? (
          // Pending invitation message
          <div className="p-6">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Invitation Pending</h3>
              <p>This user has not accepted your invitation yet. Some details will be available after they accept.</p>
              <p className="mt-2 font-medium">Email: {selectedMember.email}</p>
            </div>
          </div>
        ) : memberDetails ? (
          // Member details view
          <>
            {/* User Information */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-20 w-20 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaUserCircle className="h-12 w-12 text-purple-600" />
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold">{memberDetails.user.name}</h3>
                  <p className="text-gray-600">{memberDetails.user.email}</p>
                  <div className="mt-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information - Modified to have name and phone in one row */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Name</p>
                    <p className="font-medium">{memberDetails.user.name || 'Not available'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Phone</p>
                    <p className="font-medium">{memberDetails.user.phone || 'Not available'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <p className="text-gray-600 mb-1">Email</p>
                    <p className="font-medium">{memberDetails.user.email}</p>
                    </div>
                    <div>
                    <p className="text-gray-600 mb-1">Country</p>
                    <p className="font-medium">{memberDetails.user.country || 'Not available'}</p>
                    </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Member Since</p>
                  <p className="font-medium">
                    {formatDate(memberDetails.user.created_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Projects Information */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium mb-4">Assigned Projects</h3>
              {memberDetails.projects && memberDetails.projects.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Cases</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {memberDetails.projects.map((project) => (
                        <tr key={project.id}>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{project.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{project.project_type}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{project.description || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{project.test_cases?.length || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">No projects assigned to this member.</p>
              )}
            </div>

            {/* Test Cases Information */}
            {memberDetails.projects && memberDetails.projects.some(project => project.test_cases && project.test_cases.length > 0) && (
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium mb-4">Assigned Test Cases</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Case Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {memberDetails.projects.flatMap(project => 
                        (project.test_cases || []).map(testCase => (
                          <tr key={`${project.id}-${testCase.id}`}>
                            <td className="px-6 py-4 whitespace-nowrap">{project.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{testCase.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{testCase.testcase_type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                testCase.testcase_priority === 'Major' ? 'bg-orange-100 text-orange-800' : 
                                testCase.testcase_priority === 'Critical' ? 'bg-red-100 text-red-800' : 
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {testCase.testcase_priority}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Activity Summary - Modified to display in one row */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium mb-4">Activity Summary</h3>
              <div className="flex flex-row space-x-4">
                <div className="bg-green-50 p-4 rounded-md flex-1">
                  <p className="text-green-800 font-bold text-xl">
                    {memberDetails.projects?.reduce((total, project) => 
                      total + (project.test_cases?.length || 0), 0) || 0}
                  </p>
                  <p className="text-sm text-gray-600">Test Cases</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-md flex-1">
                  <p className="text-yellow-800 font-bold text-xl">{memberDetails.projects?.length || 0}</p>
                  <p className="text-sm text-gray-600">Projects</p>
                </div>
              </div>
            </div>

            {/* Agent Status Section */}
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Agent Status</h3>
              <div className={`p-4 rounded-md ${memberDetails.exe_downloads?.length > 0 ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                <p className="font-medium">
                  {memberDetails.exe_downloads?.length > 0 
                    ? "Agent Created" 
                    : "Agent Not Created"}
                </p>
                <p className="text-sm mt-1">
                  {memberDetails.exe_downloads?.length > 0 
                    ? "This member has created a test agent." 
                    : "This member has not yet created a test agent."}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6">
            <div className="text-lg text-gray-600">Loading member details...</div>
          </div>
        )
      ) : (
        // Members list view
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Project Members</h3>
          {loading ? (
            <p className="text-gray-600">Loading members...</p>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          ) : members.length > 0 ? (
            <ul className="space-y-2">
              {members.map((member) => (
                <li
                  key={member.id}
                  className="p-3 bg-gray-50 border rounded-md flex items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-200"
                  onClick={() => handleMemberClick(member)}
                >
                  <div>
                    <span className="text-gray-800 font-medium">
                      {member.email}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      Role: {member.role || 'Member'}
                    </span>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    member.invitation_status === 'Accepted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {member.invitation_status || 'Pending'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No members found for this project.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberDetails;