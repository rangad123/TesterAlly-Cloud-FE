import { useState, useEffect } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Users, Download, Monitor, Activity, TrendingUp, TrendingDown, Settings, Bell, BarChart3, MapPin, Laptop, Computer, Smartphone, Bot, Zap, Chrome } from 'lucide-react';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeAgents: 0,
    totalDownloads: 0,
    agentsCreated: 0,
    activeConnections: 0,
    successRate: 0,
    avgResponseTime: 0,
    systemUptime: 0,
  });

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.testerally.ai/api/admin-dashboard/');
        const data = await response.json();
        setApiData(data);

        setMetrics({
          totalUsers: data.user_agent_stats.total_users,
          activeAgents: data.user_agent_stats.active_ai_agents,
          totalDownloads: data.user_agent_stats.total_downloads,
          agentsCreated: data.user_agent_stats.agents_created,
          activeConnections: data.performance.active_connections,
          successRate: data.performance.success_rate,
          avgResponseTime: data.performance.avg_response_time,
          systemUptime: data.performance.system_uptime,
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Geographic distribution data - from API
  const geoData = apiData ? apiData.analytics.geo_distribution.map(country => ({
    country: country.country,
    users: country.user_count,
    downloads: 0, // Not provided in API
    agents: 0, // Not provided in API
    growth: 0 // Not provided in API
  })) : [];

  // Operating system distribution - from API
  const osData = apiData ? [
    { name: 'Windows', value: Math.round((apiData.analytics.os_usage.Windows / metrics.totalUsers) * 100) || 0, users: apiData.analytics.os_usage.Windows, agents: 0, color: '#8b5cf6' },
    { name: 'macOS', value: Math.round((apiData.analytics.os_usage.macOS / metrics.totalUsers) * 100) || 0, users: apiData.analytics.os_usage.macOS, agents: 0, color: '#a855f7' },
    { name: 'Linux', value: Math.round((apiData.analytics.os_usage.Linux / metrics.totalUsers) * 100) || 0, users: apiData.analytics.os_usage.Linux, agents: 0, color: '#9333ea' },
  ].filter(os => os.users > 0) : [];

  // Browser distribution - from API
  const browserData = apiData ? [
    { name: 'Chrome', value: apiData.analytics.browser_usage.Chrome, users: 0, color: '#8b5cf6' },
    { name: 'Edge', value: apiData.analytics.browser_usage.Edge, users: 0, color: '#a855f7' },
    { name: 'Firefox', value: apiData.analytics.browser_usage.Firefox, users: 0, color: '#9333ea' },
    { name: 'Safari', value: apiData.analytics.browser_usage.Safari, users: 0, color: '#c084fc' },
  ] : [];

  // Connected devices data - from API
  const deviceData = apiData ? [
    { type: 'Mobile', platform: 'Android', count: apiData.analytics.connected_devices.Android_Mobile.total, active: apiData.analytics.connected_devices.Android_Mobile.active },
    { type: 'Mobile', platform: 'iOS', count: apiData.analytics.connected_devices.iOS_Mobile.total, active: apiData.analytics.connected_devices.iOS_Mobile.active },
    { type: 'Desktop', platform: 'Windows', count: apiData.analytics.connected_devices.Windows_Desktop.total, active: apiData.analytics.connected_devices.Windows_Desktop.active },
  ] : [];

  // Daily activity data (keeping dummy data as API doesn't provide this)
  const dailyActivity = [
    { day: 'Mon', downloads: 45, agentsCreated: 23, activeUsers: 120 },
    { day: 'Tue', downloads: 52, agentsCreated: 31, activeUsers: 135 },
    { day: 'Wed', downloads: 38, agentsCreated: 19, activeUsers: 98 },
    { day: 'Thu', downloads: 47, agentsCreated: 28, activeUsers: 110 },
    { day: 'Fri', downloads: 63, agentsCreated: 35, activeUsers: 145 },
    { day: 'Sat', downloads: 71, agentsCreated: 42, activeUsers: 160 },
    { day: 'Sun', downloads: 58, agentsCreated: 29, activeUsers: 142 },
  ];

  // Monthly growth (keeping dummy data as API doesn't provide this)
  const monthlyGrowth = [
    { month: 'Apr', users: 150, agents: 89, downloads: 234 },
    { month: 'May', users: 280, agents: 156, downloads: 387 },
    { month: 'Jun', users: 420, agents: 245, downloads: 567 },
    { month: 'Jul', users: 380, agents: 223, downloads: 489 },
    { month: 'Aug', users: 520, agents: 312, downloads: 678 },
    { month: 'Sep', users: 445, agents: 267, downloads: 598 },
    { month: 'Oct', users: 610, agents: 389, downloads: 723 },
    { month: 'Nov', users: 578, agents: 356, downloads: 689 },
    { month: 'Dec', users: 692, agents: 445, downloads: 823 },
  ];

  // Recent activities (keeping dummy data as API doesn't provide this)
  const recentActivities = [
    { id: 1, type: 'agent_created', user: 'Sarah Wilson', action: 'created Email Automation Agent', system: 'Windows 11 - Chrome', device: 'Desktop', time: '2 min ago', icon: Bot },
    { id: 2, type: 'download', user: 'Mike Chen', action: 'downloaded automation tool', system: 'macOS Sonoma - Safari', device: 'MacBook Pro', time: '5 min ago', icon: Download },
    { id: 3, type: 'agent_active', user: 'Emma Davis', action: 'activated Social Media Agent', system: 'Android - Chrome', device: 'Samsung Galaxy', time: '8 min ago', icon: Zap },
    { id: 4, type: 'connection', user: 'Alex Kumar', action: 'connected iOS device', system: 'iPhone 15 Pro - Safari', device: 'Mobile', time: '12 min ago', icon: Smartphone },
    { id: 5, type: 'agent_created', user: 'John Doe', action: 'created Data Processing Agent', system: 'Ubuntu 22.04 - Firefox', device: 'Desktop', time: '15 min ago', icon: Bot },
  ];

  const MetricCard = ({ title, value, change, changeType, icon: Icon, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
          <div className="text-3xl font-bold text-gray-900 mt-2">{value}</div>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className="bg-purple-100 rounded-lg p-3">
          <Icon size={24} className="text-purple-600" />
        </div>
      </div>
      <div className={`flex items-center text-sm font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
        {changeType === 'positive' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
        <span>{change}</span>
      </div>
    </div>
  );

  const getBrowserIcon = (browser) => {
    switch (browser.toLowerCase()) {
      case 'chrome': return <Chrome size={16} className="text-purple-600" />;
      case 'firefox': return <Monitor size={16} className="text-purple-600" />;
      case 'safari': return <Laptop size={16} className="text-purple-600" />;
      case 'edge': return <Computer size={16} className="text-purple-600" />;
      default: return <Monitor size={16} className="text-purple-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-lg text-gray-600 mt-2">Monitor your AI agents, users, and automation performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Key Metrics - Row 1: User & Agent Stats */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">User & Agent Statistics</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Users"
            value={metrics.totalUsers.toLocaleString()}
            change="+12% this month"
            changeType="positive"
            icon={Users}
          />
          <MetricCard
            title="Active AI Agents"
            value={metrics.activeAgents}
            change="+8% today"
            changeType="positive"
            icon={Bot}
          />
          <MetricCard
            title="Total Downloads"
            value={metrics.totalDownloads.toLocaleString()}
            change="+23% this week"
            changeType="positive"
            icon={Download}
          />
          <MetricCard
            title="Agents Created"
            value={metrics.agentsCreated.toLocaleString()}
            change="+15% this month"
            changeType="positive"
            icon={Zap}
          />
        </div>
      </div>

      {/* Key Metrics - Row 2: Performance & Activity */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance & Activity</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Active Connections"
            value={metrics.activeConnections}
            change="+5% today"
            changeType="positive"
            icon={Activity}
          />
          <MetricCard
            title="Success Rate"
            value={`${metrics.successRate}%`}
            change="+2.1% improvement"
            changeType="positive"
            icon={TrendingUp}
          />
          <MetricCard
            title="Avg Response Time"
            value={`${metrics.avgResponseTime}s`}
            change="-15% faster"
            changeType="positive"
            icon={Zap}
          />
          <MetricCard
            title="System Uptime"
            value={`${metrics.systemUptime}%`}
            change="Excellent"
            changeType="positive"
            icon={Activity}
          />
        </div>
      </div>

      {/* System Analytics Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">System Analytics</h2>
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Geographic Distribution */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Geographic Distribution</h3>
              <p className="text-sm text-gray-600">Users by location</p>
            </div>
            <div className="space-y-3">
              {geoData.length > 0 ? geoData.map((country, index) => (
                <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <MapPin size={14} className="text-purple-600 mr-2" />
                    <span className="font-medium text-gray-900 text-sm">{country.country}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-gray-600">{country.users}u</span>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">No geographic data available</p>
              )}
            </div>
          </div>

          {/* Operating System Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Operating Systems</h3>
              <p className="text-sm text-gray-600">Platform distribution</p>
            </div>
            <div className="space-y-3">
              {osData.length > 0 ? osData.map((system, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center mr-2" style={{ backgroundColor: system.color + '20' }}>
                      {system.name === 'Windows' && <Monitor size={16} className="text-purple-600" />}
                      {system.name === 'macOS' && <Laptop size={16} className="text-purple-600" />}
                      {system.name === 'Linux' && <Computer size={16} className="text-purple-600" />}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{system.name}</div>
                      <div className="text-xs text-gray-500">{system.users} users</div>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-purple-600">{system.value}%</div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">No OS data available</p>
              )}
            </div>
          </div>

          {/* Browser Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Browser Usage</h3>
              <p className="text-sm text-gray-600">Web browser stats</p>
            </div>
            <div className="space-y-3">
              {browserData.map((browser, index) => (
                <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {getBrowserIcon(browser.name)}
                    <span className="font-medium text-gray-900 ml-2 text-sm">{browser.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-purple-600 text-sm">{browser.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Connected Devices Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Connected Devices</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deviceData.length > 0 ? deviceData.map((device, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {device.type === 'Mobile' ? (
                    <Smartphone size={16} className="text-purple-600 mr-2" />
                  ) : (
                    <Monitor size={16} className="text-purple-600 mr-2" />
                  )}
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{device.platform}</div>
                    <div className="text-xs text-gray-500">{device.type}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium text-gray-900">{device.count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active:</span>
                  <span className="font-medium text-green-600">{device.active}</span>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-4 col-span-full">No device data available</p>
          )}
        </div>
      </div>

      {/* Activity Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Daily Activity</h3>
            <p className="text-gray-600">Downloads, agent creation, and active users</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Area type="monotone" dataKey="downloads" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="agentsCreated" stackId="1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
              <Area type="monotone" dataKey="activeUsers" stackId="1" stroke="#9333ea" fill="#9333ea" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Growth */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibnel text-gray-900">Monthly Growth</h3>
            <p className="text-gray-600">User growth and AI agent adoption</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="agents" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="downloads" stroke="#9333ea" strokeWidth={3} dot={{ fill: '#9333ea', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Activities</h3>
            <p className="text-gray-600">Live user actions and AI agent operations</p>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recentActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-purple-100 rounded-lg p-2 mr-4">
                    <IconComponent size={16} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{activity.user}</span>
                      <span className="text-gray-600">{activity.action}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{activity.system}</span>
                      <span>{activity.device}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {activity.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
            <p className="text-gray-600">Management tools and settings</p>
          </div>
          <div className="space-y-3">
            <button className="w-full flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <BarChart3 size={20} className="text-purple-600 mr-3" />
              <span className="font-medium text-gray-900">Detailed Reports</span>
            </button>
            <button className="w-full flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <Users size={20} className="text-purple-600 mr-3" />
              <span className="font-medium text-gray-900">User Management</span>
            </button>
            <button className="w-full flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <Bot size={20} className="text-purple-600 mr-3" />
              <span className="font-medium text-gray-900">AI Agent Monitor</span>
            </button>
            <button className="w-full flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <Settings size={20} className="text-purple-600 mr-3" />
              <span className="font-medium text-gray-900">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;