import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [mobileSubMenus, setMobileSubMenus] = useState({});

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  const toggleMobileSubMenu = (key) => {
    setMobileSubMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleMenuHover = (menu) => {
    setActiveMenu(menu);
    setActiveSubMenu(null);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
    setActiveSubMenu(null);
  };

  const handleSubMenuHover = (subMenu) => setActiveSubMenu(subMenu);

  const menuItems = {
    personal: {
      title: "Personal",
      items: {
        internet: {
          title: "Internet",
          items: ["New Connection", "Postpaid Packages", "Prepaid Packages", "Extra GB", "Coverage"],
        },
        peotv: {
          title: "PEOTV",
          items: ["New Connection", "Channels", "Packages", "PEO Features"],
        },
        telephone: {
          title: "Telephone",
          items: ["New Connection", "Calling Plans", "Value Added Services"],
        },
        gaming: {
          title: "Gaming & Cloud",
          items: ["Cloud Services", "Mobile Games", "eSports Platform"],
        },
        idd: {
          title: "IDD",
          items: ["About IDD & FAQs", "IDD Rates"],
        },
        eteleshop: {
          title: "eTeleshop",
          items: ["Virtual Tour", "Wi-Fi Devices", "Power Backups"],
        },
        promotions: {
          title: "Promotions",
          items: ["Current Offers", "Special Deals"],
        },
      },
    },
    business: {
      title: "Business",
      items: {
        enterprises: {
          title: "Enterprises",
          items: ["Networking", "Akaza Multi Cloud", "Digital Services", "Data Center"],
        },
        sme: {
          title: "SME & Micro Business",
          items: ["Internet & TV", "Cloud & Data Center", "Networking", "Voice & Collaboration"],
        },
        wholesale: {
          title: "Wholesale",
          items: ["Services", "Solutions"],
        },
        global: {
          title: "Global Business",
          items: ["International Services", "Global Solutions"],
        },
      },
    },
  };

  return (
    <nav className="w-full border-b shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex justify-between items-center py-4">
          {/* Logo & Desktop Menu */}
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
                  <span
                    className={`cursor-pointer pb-1 transition-colors ${
                      activeMenu === key
                        ? "text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400"
                        : "hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    {menu.title}
                  </span>
                  {activeMenu === key && (
                    <div className="absolute top-full left-0 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-b-lg p-4 z-50">
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
                            <div className="absolute left-full top-0 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-r-lg p-4 z-50">
                              {subMenu.items.map((item, i) => (
                                <a key={i} href="#" className="block hover:text-blue-600 dark:hover:text-blue-400">
                                  {item}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Support</span>
              <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">About Us</span>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <span>Light</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={toggleDarkMode} />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
              </label>
              <span>Dark</span>
            </div>

            <span className="text-sm font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">Login</span>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 text-sm font-medium"
              aria-label="Pay your bill"
            >
              PAY YOUR BILL
            </button>

            <button
              className="text-xl hover:text-blue-600 dark:hover:text-blue-400"
              onClick={toggleSearch}
              aria-label="Search"
            >
              🔍
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl hover:text-blue-600 dark:hover:text-blue-400"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            ☰
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {Object.entries(menuItems).map(([key, menu]) => (
              <div key={key} className="space-y-2">
                <button
                  className="w-full text-left font-bold text-blue-700 dark:text-blue-400"
                  onClick={() => toggleMobileSubMenu(key)}
                >
                  {menu.title}
                </button>
                {mobileSubMenus[key] && (
                  <div className="pl-4 space-y-2">
                    {Object.entries(menu.items).map(([subKey, subMenu]) => (
                      <div key={subKey} className="space-y-1">
                        <span className="block font-medium">{subMenu.title}</span>
                        <div className="pl-4 space-y-1">
                          {subMenu.items.map((item, i) => (
                            <a key={i} href="#" className="block hover:text-blue-600 dark:hover:text-blue-400">
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">Login</span>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 text-sm font-medium"
              >
                PAY YOUR BILL
              </button>
            </div>
          </div>
        )}

        {/* Bottom Row - Secondary Nav */}
        <div className="hidden md:flex items-center gap-6 py-2 text-sm font-medium">
          {[
            "Internet",
            "PEOTV",
            "Telephone",
            "Gaming & Cloud",
            "IDD",
            "eTeleshop",
            "Promotions",
            "Virtual Teleshop",
          ].map((item, i) => (
            <span key={i} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {item}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
