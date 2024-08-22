import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Bar, Line } from 'react-chartjs-2';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'chart.js/auto';

// Mock data for charts
const jobListingsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Job Listings',
      data: [5, 10, 8, 6, 12, 9],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const applicationsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Applications',
      data: [15, 20, 18, 23, 17, 14],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    },
  ],
};

// Side Navigation Component
const SideNav = ({ role }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-6">
        <h3 className="text-xl font-semibold">
          {role === 'company' ? 'Company Dashboard' : 'Medical Practitioner Dashboard'}
        </h3>
      </div>
      <ul className="flex flex-col flex-grow">
        <li className="p-4 hover:bg-gray-700">
          <Link to="/dashboard/overview">Overview</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/dashboard/profile">{role === 'company' ? 'Company Profile' : 'Professional Profile'}</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/Jobs">Job Listings</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/dashboard/applications">Applications</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/dashboard/analytics">Analytics</Link>
        </li>
      </ul>
    </div>
  );
};

// Company Dashboard Components
const CompanyDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
      <p>Welcome to your company dashboard. Manage your profile, applications, and analyze performance.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
      {/* Insert a list or chart */}
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <Bar data={applicationsData} />
    </div>
  </div>
);

const CompanyProfile = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
    <p>Update your company information, logo, and contact details.</p>
    {/* Add form or details here */}
  </div>
);

const CompanyApplications = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Applications</h2>
    <p>View and manage applications from candidates.</p>
    {/* Table or list of applications */}
  </div>
);

const CompanyAnalytics = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Analytics</h2>
    <Bar data={applicationsData} />
  </div>
);

// Medical Practitioner Dashboard Components
const MedicalPractitionerDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Professional Overview</h2>
      <p>Welcome to your dashboard. Manage your profile, view job opportunities, and analyze your application performance.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Job Listings</h2>
      {/* Insert a list or chart */}
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <Line data={jobListingsData} />
    </div>
  </div>
);

const MedicalPractitionerProfile = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Professional Profile</h2>
    <p>Update your professional information, CV, and certifications.</p>
    {/* Add form or details here */}
  </div>
);

const MedicalPractitionerJobs = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Job Listings</h2>
    <p>Browse and apply for available job opportunities.</p>
    {/* Table or list of job listings */}
  </div>
);

const MedicalPractitionerAnalytics = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Analytics</h2>
    <Line data={jobListingsData} />
  </div>
);

const DashboardContent = ({ role }) => {
  return (
    <Routes>
      <Route path="/dashboard/overview" element={role === 'company' ? <CompanyDashboard /> : <MedicalPractitionerDashboard />} />
      <Route path="/dashboard/profile" element={role === 'company' ? <CompanyProfile /> : <MedicalPractitionerProfile />} />
      <Route path="/Jobs" element={<MedicalPractitionerJobs />} />
      <Route path="/dashboard/applications" element={<CompanyApplications />} />
      <Route path="/dashboard/analytics" element={role === 'company' ? <CompanyAnalytics /> : <MedicalPractitionerAnalytics />} />
    </Routes>
  );
};

const Dashboard = () => {
  const { authState } = useContext(AuthContext);

  return (
    <div className="flex">
      <SideNav role={authState.role} />
      <div className="flex-grow p-8 bg-gray-100">
        <nav className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {authState.name}</h1>
          <p className="text-lg text-gray-600">Role: {authState.role}</p>
        </nav>
        <DashboardContent role={authState.role} />
      </div>
    </div>
  );
};

export default Dashboard;
