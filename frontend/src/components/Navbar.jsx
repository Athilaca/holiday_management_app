import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 py-6 fixed top-0 left-0 w-full z-50">
    <div className="flex justify-center items-center">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white">Home</Link></li>
        <li><Link to="/about" className="text-white">About</Link></li>
        <li><Link to="/contact" className="text-white">Contact</Link></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;


