
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">HealNow MedsDirect</h3>
            <p className="mt-2 text-sm text-gray-600">
              Your trusted source for online medical consultations and medicine delivery.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-medical-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/symptoms" className="text-sm text-gray-600 hover:text-medical-600">
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="text-sm text-gray-600 hover:text-medical-600">
                  Medicines
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-sm text-gray-600 hover:text-medical-600">
                  Chat with Doctor
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-medical-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-medical-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-gray-600">
                Email: contact@healnow.com
              </li>
              <li className="text-sm text-gray-600">
                Phone: +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6 flex justify-between">
          <p className="text-sm text-gray-600">
            &copy; 2025 HealNow MedsDirect. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for better health
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
