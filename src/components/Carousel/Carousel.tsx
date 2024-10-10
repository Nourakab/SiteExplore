import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
  title: string;
}

const Carousel = ({ images, title }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Automatically go to the next image after a certain time
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        handleNextImage();
      }, 3000); // 3 seconds

      return () => clearInterval(timer); // Clear interval on component unmount
    }
  }, [currentIndex, isHovered]);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  if (images.length === 0) return null; // Don't render if no images are available

  return (
    <div
      className="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={images[currentIndex]}
        alt={`${title} - image ${currentIndex + 1}`}
        className="carousel-image"
      />
      {images.length > 1 && (
        <div className="carousel-controls">
          <button onClick={handlePrevImage}>Prev</button>
          <button onClick={handleNextImage}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
