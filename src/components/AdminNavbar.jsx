import React, { useState, useEffect } from "react";

const AdminNavbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const navLinks = [
    //{ name: "Dashboard", href: "#" },
    //{ name: "Users", href: "#" },
    //{ name: "Reports", href: "#" },
    //{ name: "Settings", href: "#" },
  ];

  return (
    <nav className="w-full border-b shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-6">
            
            <div className="hidden md:flex gap-6 text-sm font-semibold">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <span>Light</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
              </label>
              <span>Dark</span>
            </div>

            <button 
              onClick={toggleSearch} 
              className="text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Search"
            >
              &#128269;
            </button>

            <div className="relative">
              <span className="text-sm font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Admin
              </span>
            </div>
          </div>

          <button 
            className="md:hidden text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            &#9776;
          </button>
        </div>

        {isSearchOpen && (
          <div className="py-2">
            <input
              type="text"
              placeholder="Search users, reports..."
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleDarkMode}
                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Toggle Dark Mode
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
