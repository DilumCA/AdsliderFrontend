import React, { useState, useEffect } from "react";
import TopNavigation from "../components/TopNavigation";
import AdSlider from "../components/AdSlider";
import axios from "axios";
import Navbar from "../components/Navbar";

function CustomerHome() {
  const [adUrls, setAdUrls] = useState([]); // State to store ad URLs
  const userId = JSON.parse(localStorage.getItem("userData"))?._id; // Use _id instead of id

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ads/personalized/${userId}`);
        setAdUrls(response.data); // Set the received ad data
      } catch (error) {
        console.error("Error fetching personalized ads:", error);
      }
    };

    if (userId) {
      fetchAds();
    }
  }, [userId]);

  return (
    <div>
      <Navbar />
      {adUrls.length > 0 ? (
        <AdSlider images={adUrls} interval={5000} /> // Pass ad data to AdSlider
      ) : (
        <p className="text-center text-gray-500">No ads available at the moment.</p>
      )}
      <TopNavigation />
    </div>
  );
}

export default CustomerHome;