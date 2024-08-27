import React, { useState, useEffect, useRef } from 'react';

const MagnifyingGlass = ({ src, zoomLevel = 2 }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      const { width, height } = img.getBoundingClientRect();
      setSize([width, height]);
    }
  }, [src]);

  const handleMouseMove = (e) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();

    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Product"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseMove}
        style={{ height: '100%', width: '100%', objectFit: 'contain' }}
      />

      {showMagnifier && (
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            height: '100px',
            width: '100px',
            top: `${y - 50}px`,
            left: `${x - 50}px`,
            opacity: '1',
            border: '2px solid #a7f3d0',
            borderRadius: '50%',
            backgroundColor: 'white',
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-x * zoomLevel + 50}px`,
            backgroundPositionY: `${-y * zoomLevel + 50}px`,
          }}
        />
      )}
    </div>
  );
};

export default MagnifyingGlass;