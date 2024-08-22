import React from 'react';
import { useParams } from 'react-router-dom';

const mockJobs = [
  { id: 1, title: 'Nurse', location: 'Nairobi', description: 'Looking for a qualified nurse...' },
  { id: 2, title: 'Doctor', location: 'Mombasa', description: 'Seeking experienced doctor...' },
  { id: 3, title: 'Pharmacist', location: 'Kisumu', description: 'Pharmacy looking for a pharmacist...' },
];

function JobDetailPage() {
  const { id } = useParams();
  const job = mockJobs.find(job => job.id === parseInt(id));

  return (
    <div className="p-6">
      {job ? (
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
          <p className="text-gray-600 mb-4">{job.location}</p>
          <p>{job.description}</p>
        </div>
      ) : (
        <p>Job not found.</p>
      )}
    </div>
  );
}

export default JobDetailPage;
