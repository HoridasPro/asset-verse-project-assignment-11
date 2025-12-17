import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">AssetVerse</h3>
          <p className="text-gray-200">
            Smart Asset Management for HR teams and employees. Streamline your
            operations and track requests efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#hero" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#features" className="hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="#packages" className="hover:underline">
                Packages
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Contact</h4>
          <p>
            Email:{" "}
            <a href="mailto:support@assetverse.com" className="hover:underline">
              support@assetverse.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+880123456789" className="hover:underline">
              +880 123 456 789
            </a>
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-gray-200">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Newsletter or Info */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
          <p className="text-gray-200 mb-4">
            Subscribe to get the latest updates about AssetVerse.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="horidas@gmail.com"
              className="px-4 py-2 rounded-l-lg text-black w-full"
            />
            <button
              type="submit"
              className="bg-white text-indigo-700 px-3 py-2 rounded-r-lg font-semibold hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-white/20 pt-6 text-center text-gray-200">
        © {new Date().getFullYear()} AssetVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
