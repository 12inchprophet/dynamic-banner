import React, { useState, useEffect } from '@blocklet/pages-kit/builtin/react';
import { Box } from '@blocklet/pages-kit/builtin/mui/material';

const FadingImageBanner = ({
  height = '300px', // Default height
  interval = '5s', // Default interval
  transitionType = 'ease-in-out', // Default transition type
  padding = '0px', // Default padding
  coverMode = true, // Default cover mode
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
}) => {
  // Collect all image props into an array, filtering out undefined/null ones
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ].filter((image) => image?.url);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const intervalInMs = parseFloat(interval) * 1000;
  const transitionSpeed = intervalInMs / 3; // One-third of the total interval for transitions

  useEffect(() => {
    if (images.length === 0) return;

    const fadeOut = () => {
      setOpacity(0); // Start fading out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Switch image
        setOpacity(1); // Fade back in
      }, transitionSpeed);
    };

    const intervalId = setInterval(fadeOut, intervalInMs); // Run fadeOut on interval

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [images.length, intervalInMs, transitionSpeed]);

  // Don't render anything if there are no valid images
  if (images.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: typeof height === 'string' ? height : `${height}px`, // Support both string and number inputs
        backgroundImage: `url(${images[currentImageIndex]?.url})`,
        backgroundSize: coverMode ? 'cover' : 'contain', // Toggle between 'cover' and 'contain'
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        opacity: opacity,
        padding: typeof padding === 'string' ? padding : `${padding}px`, // Support both string and number inputs
        transition: `opacity ${transitionSpeed / 1000}s ${transitionType}`, // Use the provided transition type
      }}
    >
      {/* Render the current image as an <img> tag for accessibility */}
      <img
        src={images[currentImageIndex]?.url}
        alt={images[currentImageIndex]?.alt || ''}
        style={{
          width: '100%',
          height: '100%',
          objectFit: coverMode ? 'cover' : 'contain', // Toggle between 'cover' and 'contain'
          visibility: 'hidden',
        }}
      />
    </Box>
  );
};

export default FadingImageBanner;
