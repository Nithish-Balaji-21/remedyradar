
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, User, Home, Pill, MessageSquare, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-medical-600 font-bold text-xl">REMEDY</span>
              <span className="text-gray-600 ml-1 font-medium text-xl">RADAR</span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-gray-600 hover:text-medical-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link to="/symptoms" className="text-gray-600 hover:text-medical-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Pill className="h-4 w-4 mr-1" />
              Symptom Checker
            </Link>
            <Link to="/medicines" className="text-gray-600 hover:text-medical-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Pill className="h-4 w-4 mr-1" />
              Medicines
            </Link>
            <Link to="/chat" className="text-gray-600 hover:text-medical-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              Chat with Doctor
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-medical-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {user?.role === 'admin' ? 'Admin Dashboard' : 'Profile'}
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-gray-600 hover:text-medical-600"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-medical-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </Link>
            )}
            
            <Link to="/cart" className="relative text-gray-600 hover:text-medical-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Cart
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-medical-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative p-2 mr-2">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-medical-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-3 border-b border-gray-200">
          <div className="space-y-1 px-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-medical-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/symptoms" 
              className="text-gray-600 hover:text-medical-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Symptom Checker
            </Link>
            <Link 
              to="/medicines" 
              className="text-gray-600 hover:text-medical-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Medicines
            </Link>
            <Link 
              to="/chat" 
              className="text-gray-600 hover:text-medical-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Chat with Doctor
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-gray-600 hover:text-medical-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {user?.role === 'admin' ? 'Admin Dashboard' : 'Profile'}
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-medical-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-medical-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
