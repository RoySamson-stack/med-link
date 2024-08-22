import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import BgImage from '../img/whiteblue.png'; 

function Home() {
  const [query, setQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = () => {
    navigate(`/jobs`);
  };

  const handleLogout = () => {
    // Remove token from localStorage and update state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const menuItems = ['Features', 'Testimonials', 'Contact'];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
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
                <Button className="px-4 py-2 bg-red-500 rounded" onClick={handleLogout}>Logout</Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="px-4 py-2 bg-blue-500 rounded" onClick={() => navigate('/profile')}>Profile</Button>
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

      {/* Hero Section */}
      <header
        className="flex items-center justify-between py-20 text-white relative bg-cover bg-center"
        style={{ 
          minHeight: '80vh',
          backgroundImage: `url(${BgImage})`
        }}
      >
        <div className="flex-1 p-20 text-blue-900">
          <h1 className="text-5xl font-bold mb-4">Welcome Medical Practitioners</h1>
          <p className="text-xl mb-6">Discover job opportunities that match your skills and expertise.</p>
          {/* Remove the search bar */}
        </div>
        <div className="w-1/2 flex justify-center">
          <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center">
            <img src="path_to_image.jpg" alt="Hero Image" className="w-40 h-40 rounded-full" />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-10 bg-white text-center" style={{ minHeight: '80vh' }}>
        <h2 className="text-4xl font-bold mb-6">Features</h2>
        <p className="text-lg mb-6">Explore the amazing features we offer to help you find your dream job.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded shadow">
            <h3 className="text-2xl font-bold mb-4">User Friendly dashboard</h3>
            <p>Personalized dashboard showcasing job recommendations, application status, and notifications.</p>
            <p>Quick access to application history and saved job searches.</p>
          </div>
          <div className="p-6 border rounded shadow">
            <h3 className="text-2xl font-bold mb-4">Advanced job search</h3>
            <p>Filters for speciality, location ,job type and experience level </p>
          </div>
          <div className="p-6 border rounded shadow">
            <h3 className="text-2xl font-bold mb-4">Profile creation and Management</h3>
            <p>Detailed description of Feature 3.</p>
          </div>
          
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-10 bg-blue-500 text-white text-center" style={{ minHeight: '80vh' }}>
        <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>
        <p className="text-lg mb-6">Hear from some of our satisfied users.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded bg-white text-blue-500">
            <p>"This platform has been a game-changer for me. Highly recommend!"</p>
            <p className="font-bold mt-4">- User 1</p>
          </div>
          <div className="p-6 border rounded bg-white text-blue-500">
            <p>"Fantastic service and easy to use. Found my dream job in no time."</p>
            <p className="font-bold mt-4">- User 2</p>
          </div>
          <div className="p-6 border rounded bg-white text-blue-500">
            <p>"Great experience! The support team is incredibly helpful."</p>
            <p className="font-bold mt-4">- User 3</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-white text-center" style={{ minHeight: '80vh' }}>
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-6">Join us today and take the next step in your career.</p>
        <Button className="px-6 py-3 bg-blue-500 text-white rounded">Sign Up Now</Button>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-blue-500 text-white text-center">
        <p className="mb-4">Contact Us: contact@doctor-doctor.com</p>
        <div className="flex justify-center space-x-4">
          <Link href="#" className="text-white">Facebook</Link>
          <Link href="#" className="text-white">Twitter</Link>
          <Link href="#" className="text-white">LinkedIn</Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;
