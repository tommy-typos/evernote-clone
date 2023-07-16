import React, { useRef } from 'react';

export const Offset = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (elementRef.current) {
      const { top, left, width, height } = elementRef.current.getBoundingClientRect();
      console.log('Element Coordinates:', { top, left, width, height });
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick} className='border bg-red-300'>Get Element Coordinates</button>
      <div ref={elementRef} className='border bg-red-500'>This is the target element</div>
    </div>
  );
};
