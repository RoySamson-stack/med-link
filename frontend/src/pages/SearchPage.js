import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button, Card, CardHeader, CardBody, CardFooter, Divider } from '@nextui-org/react';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function JobSearchPage() {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/job-alerts'); 
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch job alerts.');
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (id) {
      const job = jobs.find(job => job._id === id); 
      setSelectedJob(job);
    }
  }, [id, jobs]);

  useEffect(() => {
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) &&
      (category ? job.title === category : true) &&
      (region ? job.location === region : true)
    );
    setFilteredJobs(filtered);
  }, [query, category, region, jobs]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || '');
    }
  }, []);

  const handleSearch = () => {
    setFilteredJobs(jobs.filter(job => job.title.toLowerCase().includes(query.toLowerCase())));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  const menuItems = ['Features', 'Customers', 'Integrations'];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar items */}
      <Navbar disableAnimation isBordered className="p-2">
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <div className="text-2xl font-bold">DOCTOR, DOCTOR</div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <div className="text-2xl font-bold">DOCTOR, DOCTOR</div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          {!isLoggedIn ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Button className="px-4 py-2 shadow-lg rounded" onClick={() => navigate('/login')}>Login</Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="px-4 py-2 bg-green-500 rounded" onClick={() => navigate('/register')}>Register</Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <div className="px-4 py-2">Hello, {username}</div>
              </NavbarItem>
              <NavbarItem>
                <Button className="px-4 py-2 bg-red-500 rounded" onClick={handleLogout}>Logout</Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div className="flex">
        <div className="w-1/6 lg:w-1/8 p-4 bg-blue-400 min-h-screen">
          <h2 className="text-xl font-bold mb-4">Filter by:</h2>
          <div className="mb-4">
            <h3 className="font-semibold">Category</h3>
            <ul>
              {['Intern', 'Nurse', 'Doctor', 'Lab', 'Surgeon'].map(cat => (
                <li key={cat} className="my-2">
                  <button
                    className={`w-full text-left p-2 ${category === cat ? 'bg-blue-200 text-white' : 'bg-white text-gray-800'}`}
                    onClick={() => setCategory(cat === category ? '' : cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Region</h3>
            <ul>
              {['Nairobi', 'Mombasa', 'Kisumu'].map(reg => (
                <li key={reg} className="my-2">
                  <button
                    className={`w-full text-left p-2 ${region === reg ? 'bg-blue-200 text-white' : 'bg-white text-gray-800'}`}
                    onClick={() => setRegion(reg === region ? '' : reg)}
                  >
                    {reg}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-3/4 p-4">
          {/* the search bar */}
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 border rounded w-64 text-gray-800"
              placeholder="Search for jobs..."
            />
            <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">
              Search
            </button>
          </div>

          {selectedJob ? (
            <div className="bg-white p-6 rounded shadow">
              <h1 className="text-2xl font-bold mb-2">{selectedJob.title}</h1>
              <p className="text-gray-600 mb-4">{selectedJob.location}</p>
              <p>{selectedJob.description}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.length ? (
                filteredJobs.map(job => (
                  <Card key={job._id} className="max-w-[400px] mb-4 bg-blue-100 rounded-md p-5 shadow-2xl">
                    <CardHeader className="flex gap-3">
                      <div className="flex flex-col">
                        <p className="text-md font-semibold">{job.title}</p>
                        <p className="text-small text-default-500">{job.location}</p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <p>{job.description}</p>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <Button
                        onClick={() => navigate(`/job/${job._id}`)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        See Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <p className="text-gray-600">No jobs found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobSearchPage;
