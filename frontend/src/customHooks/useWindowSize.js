import { useState, useEffect } from "react";

const getWindowsize = () => {
  const { innerWidth, innerHeight } = window;
  return {
    width: innerWidth,
    height: innerHeight,
  };
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowsize());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowsize());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowSize;
};

export default useWindowSize;
