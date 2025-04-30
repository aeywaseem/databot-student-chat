
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold gradient-text">
              Databotics
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Creating customized chatbots for students using PDF data
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
              Platform
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-base text-gray-600 hover:text-databot-purple">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-base text-gray-600 hover:text-databot-purple">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-base text-gray-600 hover:text-databot-purple">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-databot-purple">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-databot-purple">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-databot-purple">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-databot-purple">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:info@databotics.ai" className="text-base text-gray-600 hover:text-databot-purple">
                  info@databotics.ai
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-databot-purple">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-databot-purple">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Databotics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
