import React from 'react';
import { useState, useEffect } from 'react';

interface Size {
  width: number;
  height: number;
}

export const useWindowSize = (props?: Size) => {
  const [windowSize, setWindowSize] = useState<Size | undefined>();

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export const useNoRenderRef = (currentValue: any) => {
  const ref = React.useRef(currentValue);
  ref.current = currentValue;
  return ref;
};
