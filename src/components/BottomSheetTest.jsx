import React from 'react';
import Draggable from 'react-draggable';

const BottomSheetTest = ({ isOpen, onClose, children }) => {
  const onDragStop = (e, data) => {
    if (data.lastY > 100) {
      onClose();
    }
  };

  return (
    <div className={`bottom-sheet ${isOpen ? 'open' : ''}`}>
      <Draggable
        axis="y"
        onStop={onDragStop}
      >
        <div className="sheet-content">
          {children}
        </div>
      </Draggable>
    </div>
  );
};

export default BottomSheetTest;