import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AdSlider = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(slideInterval);
  }, [images.length, interval]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden  shadow-md h-[300px] md:h-[350px]">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((item, index) => (
          <div
          key={index}
          className="min-w-full flex flex-col md:flex-row h-[300px] md:h-[350px]"
        >
          {/* Text */}
          <div className="w-full md:w-1/2 h-[150px] md:h-full flex items-center justify-center p-4 bg-[#0059a9] text-white text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold">{item.title}</h2>
          </div>
        
          {/* Image */}
          <div className="w-full md:w-1/2 h-[150px] md:h-full">
            <img
              src={item.url}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 p-2 rounded-full text-white hover:bg-opacity-50"
      >
        <FaChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 p-2 rounded-full text-white hover:bg-opacity-50"
      >
        <FaChevronRight size={30} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdSlider;

