import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo or Brand Name */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-xl font-bold">Your Store Name</h1>
            <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          
          {/* Links */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="text-sm">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex items-center space-x-4">
              <a href="https://facebook.com"><FaFacebook className="text-2xl hover:text-green-500" /></a>
              <a href="https://twitter.com"><FaTwitter className="text-2xl hover:text-green-500" /></a>
              <a href="https://instagram.com"><FaInstagram className="text-2xl hover:text-green-500" /></a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p className="text-sm">123 Shopping Street, City, Country</p>
            <p className="text-sm">Phone: +1234567890</p>
            <p className="text-sm">Email: info@example.com</p>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Your Store Name. All Rights Reserved.</p>
          <p>Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
