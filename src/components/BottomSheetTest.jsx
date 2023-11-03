import React, { useState, useRef } from 'react';

const BottomSheetTest = ({ isOpen, onClose, children }) => {
  const sheetRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const handleDragStart = (e) => {
    if (isOpen) {
      setIsDragging(true);
      setStartY(e.clientY || e.touches[0].clientY);
    }
  };

  const handleDragMove = (e) => {
    if (isDragging) {
      const deltaY = (e.clientY || e.touches[0].clientY) - startY;
      setCurrentY(deltaY);
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      if (currentY >= 100) {
        onClose();
      } else {
        sheetRef.current.style.transform = '';
      }
    }
  };

  return (
    <div
      className={`bottom-sheet ${isOpen ? 'open' : ''}`}
      ref={sheetRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div className="bottom-sheet-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BottomSheetTest;