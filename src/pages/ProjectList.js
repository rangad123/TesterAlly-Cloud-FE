
import React, { useState, useEffect, useCallback } from "react";
import { MonitorSmartphone, Smartphone, Monitor, BarChart3, Globe } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const fetchAllProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.testerally.ai/api/projects/?user_id=${userId}`);

      if (response.ok) {
        const data = await response.json();
        console.log("Projects from DB:", data);
        setAllProjects(data);
      } else {
        console.error("Error fetching projects from database");
        setAllProjects([]);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setAllProjects([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAllProjects();
  }, [fetchAllProjects]);

  const handleProjectClick = (project) => {
    const currentUser = localStorage.getItem("userId");
    const savedProjectKey = `selectedProject_${currentUser}`;
    localStorage.setItem(savedProjectKey, JSON.stringify(project));
    localStorage.setItem("selectedProject", JSON.stringify(project));

    window.dispatchEvent(new CustomEvent("projectChanged", { detail: project }));
    window.dispatchEvent(new CustomEvent("showProjectSidebar", { detail: true }));

    navigate("/test-cases");
  };

  const renderProjectRow = (project) => (
    <tr
      key={project.id}
      className="group hover:bg-gray-50 transition-colors duration-200 border-b cursor-pointer"
      onClick={() => handleProjectClick(project)}
    >
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{project.name}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{project.description || "N/A"}</td>
      <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-2">
        {project.project_type === "Web Application" && <>
          <Globe className="w-4 h-4 text-blue-600" /> Web App
        </>}
        {project.project_type === "Mobile Application" && <>
          <Smartphone className="w-4 h-4 text-green-600" /> Mobile App
        </>}
        {project.project_type === "Desktop Application" && <>
          <Monitor className="w-4 h-4 text-purple-600" /> Desktop App
        </>}
        {project.project_type === "Data Analyst" && <>
          <BarChart3 className="w-4 h-4 text-orange-600" /> Analyst
        </>}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {project.created_at ? new Date(project.created_at).toLocaleDateString() : "N/A"}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-2">
        {project.platform === "Android" && <>
          <Smartphone className="w-4 h-4 text-green-600" /> Android
        </>}
        {project.platform === "IOS" && <>
          <MonitorSmartphone className="w-4 h-4 text-gray-600" /> iOS
        </>}
        {project.platform === "Laptop/PC" && <>
          <Monitor className="w-4 h-4 text-blue-600" /> Laptop
        </>}
        {project.platform === "Mobile" && <>
          <Smartphone className="w-4 h-4 text-pink-500" /> Mobile
        </>}
      </td>
    </tr>
  );

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-5xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Projects List</h2>
          <button
            onClick={fetchAllProjects}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Refresh Projects
          </button>
        </div>

        {loading ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg mb-4">Loading projects...</p>
          </div>
        ) : allProjects.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg mb-4">You have no projects yet.</p>
            <p className="text-gray-500">Please create a project to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">Project Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">Description</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">Project Type</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">Created At</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allProjects.map((project) => renderProjectRow(project))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;

