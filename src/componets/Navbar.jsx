import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  useEffect(() => {
    // Apply dark mode to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleMenuHover = (menu) => {
    setActiveMenu(menu);
    setActiveSubMenu(null);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
    setActiveSubMenu(null);
  };

  const handleSubMenuHover = (subMenu) => {
    setActiveSubMenu(subMenu);
  };

  // Menu data structure
  const menuItems = {
    personal: {
      title: "Personal",
      items: {
        internet: {
          title: "Internet",
          items: ["New Connection", "Postpaid Packages", "Prepaid Packages", "Extra GB", "Coverage"]
        },
        peotv: {
          title: "PEOTV",
          items: ["New Connection", "Channels", "Packages", "PEO Features"]
        },
        telephone: {
          title: "Telephone",
          items: ["New Connection", "Calling Plans", "Value Added Services"]
        },
        gaming: {
          title: "Gaming & Cloud",
          items: ["Cloud Services", "Mobile Games", "eSports Platform"]
        },
        idd: {
          title: "IDD",
          items: ["About IDD & FAQs", "IDD Rates"]
        },
        eteleshop: {
          title: "eTeleshop",
          items: ["Virtual Tour", "Wi-Fi Devices", "Power Backups"]
        },
        promotions: {
          title: "Promotions",
          items: ["Current Offers", "Special Deals"]
        }
      }
    },
    business: {
      title: "Business",
      items: {
        enterprises: {
          title: "Enterprises",
          items: ["Networking", "Akaza Multi Cloud", "Digital Services", "Data Center"]
        },
        sme: {
          title: "SME & Micro Business",
          items: ["Internet & TV", "Cloud & Data Center", "Networking", "Voice & Collaboration"]
        },
        wholesale: {
          title: "Wholesale",
          items: ["Services", "Solutions"]
        },
        global: {
          title: "Global Business",
          items: ["International Services", "Global Solutions"]
        }
      }
    }
  };

  return (
    <nav className="w-full border-b shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-6">
            <img 
              src="https://internetusage.slt.lk/static/media/slt_logo_new.be681e06.png" 
              alt="SLT Mobitel Logo" 
              className="h-10" 
            />

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-4 text-sm font-semibold">
              {Object.entries(menuItems).map(([key, menu]) => (
                <div 
                  key={key}
                  className="relative"
                  onMouseEnter={() => handleMenuHover(key)}
                  onMouseLeave={handleMenuLeave}
                >
                  <span className={`${activeMenu === key ? 'text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400' : 'hover:text-blue-600 dark:hover:text-blue-400'} pb-1 cursor-pointer transition-colors`}>
                    {menu.title}
                  </span>
                  {activeMenu === key && (
                    <div className="absolute top-full left-0 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-b-lg p-4">
                      <div className="space-y-2">
                        {Object.entries(menu.items).map(([subKey, subMenu]) => (
                          <div 
                            key={subKey}
                            className="relative"
                            onMouseEnter={() => handleSubMenuHover(subKey)}
                          >
                            <span className="block hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                              {subMenu.title}
                            </span>
                            {activeSubMenu === subKey && (
                              <div className="absolute left-full top-0 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-r-lg p-4">
                                <div className="space-y-2">
                                  {subMenu.items.map((item, index) => (
                                    <a 
                                      key={index}
                                      href="#"
                                      className="block hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                      {item}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Support</span>
              <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">About Us</span>
            </div>
          </div>

          {/* Desktop Actions */}
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

            <span className="text-sm font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Login
            </span>

            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 text-sm font-medium transition-colors"
              aria-label="Pay your bill"
            >
              PAY YOUR BILL
            </button>

            <button 
              className="text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={toggleSearch}
              aria-label="Search"
            >
              &#128269;
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            &#9776;
          </button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {Object.entries(menuItems).map(([key, menu]) => (
              <div key={key} className="space-y-2">
                <span className="text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400 pb-1">
                  {menu.title}
                </span>
                <div className="pl-4 space-y-2">
                  {Object.entries(menu.items).map(([subKey, subMenu]) => (
                    <div key={subKey} className="space-y-2">
                      <span className="block font-medium">{subMenu.title}</span>
                      <div className="pl-4 space-y-1">
                        {subMenu.items.map((item, index) => (
                          <a 
                            key={index}
                            href="#"
                            className="block hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Login
              </span>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 text-sm font-medium transition-colors"
                aria-label="Pay your bill"
              >
                PAY YOUR BILL
              </button>
            </div>
          </div>
        )}

        {/* Secondary Navigation */}
        <div className="hidden md:flex items-center gap-6 py-2 text-sm font-medium">
          <span className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Internet</span>
          <span className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">PEOTV</span>
          <span className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Telephone</span>
          <span className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Gaming & Cloud</span>
          <span className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">IDD</span>
          <span className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">eTeleshop</span>
          <span className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Promotions</span>
          <span className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Virtual Teleshop</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

