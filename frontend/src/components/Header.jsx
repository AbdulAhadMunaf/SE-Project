import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header(){
  const { user, logout } = useAuth();
  const nav = [
    { to: '/', label: 'Home' },
    { to: '/cars', label: 'Cars' },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </svg>
          <span className="text-2xl font-black text-blue-600 hover:text-blue-700 transition-colors">
            Rent A Car
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          {nav.map(n => (
            <Link 
              key={n.to} 
              to={n.to} 
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200"
            >
              {n.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link 
                to="/account" 
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200"
              >
                Account
              </Link>
              {user.role === 'staff' ? (
                <Link 
                  to="/staff" 
                  className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Staff Panel
                </Link>
              ) : (
                <Link 
                  to="/customer/bookings" 
                  className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  My Bookings
                </Link>
              )}
              <button 
                onClick={logout} 
                className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
