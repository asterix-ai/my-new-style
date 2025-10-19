import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Fish, LogIn, LogOut, PlusCircle, Home, Sun, Moon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  const { user, signOut, loading, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center sm:px-4 md:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <Fish className="w-7 h-7" /> السفاريتي
        </Link>
        <div className="flex items-center space-x-4 space-x-reverse">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> الرئيسية
          </Link>
          <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
            <Fish className="w-4 h-4" /> المنتجات
          </Link>

          {isAuthenticated && ( // Only show if authenticated
            <>
              <Link to="/add-product" className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
                <PlusCircle className="w-4 h-4" /> إضافة منتج
              </Link>
              <button
                onClick={signOut}
                className="flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-200 transition-colors"
                disabled={loading}
              >
                <LogOut className="w-4 h-4" /> تسجيل الخروج
              </button>
            </>
          )}

          {!isAuthenticated && (
            <Link to="/signin" className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
              <LogIn className="w-4 h-4" /> تسجيل الدخول
            </Link>
          )}
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="تبديل الوضع الليلي/النهاري"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
