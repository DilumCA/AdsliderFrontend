import React from "react";
import {
  FaFolder,
  FaWifi,
  FaReceipt,
  FaChartBar,
  FaCreditCard,
  FaHeadset,
} from "react-icons/fa";

const TopNavigation = () => {
  const navItems = [
    { icon: <FaFolder className="text-blue-600 text-3xl" />, label: "Directory\nSearch" },
    { icon: <FaWifi className="text-blue-600 text-3xl" />, label: "Register for\nFibre" },
    { icon: <FaReceipt className="text-blue-600 text-3xl" />, label: "MySLT\nPortal" },
    { icon: <FaChartBar className="text-blue-600 text-3xl" />, label: "Promotions" },
    { icon: <FaCreditCard className="text-blue-600 text-3xl" />, label: "Pay Online" },
    { icon: <FaHeadset className="text-blue-600 text-3xl" />, label: "Support" },
  ];

  return (
    <div className="flex border border-blue-600 shadow-sm bg-white">
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center p-4 text-center cursor-pointer border-r border-blue-600 hover:bg-blue-50 ${
            index === navItems.length - 1 ? "border-r-0" : ""
          }`}
        >
          {item.icon}
          <span className="mt-2 text-sm font-bold text-blue-800 whitespace-pre-line">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TopNavigation;
