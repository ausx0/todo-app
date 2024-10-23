import React, { useEffect, useState } from "react";

/**
 * Custom hook to determine if the current screen size is below a specified breakpoint.
 * This hook returns `true` if the screen width is smaller than the breakpoint (mobile view), and `false` otherwise.
 *
 * @param {number} breakpoint - The screen width threshold for mobile devices. Default is 768 pixels.
 * @returns {boolean} - Returns `true` if the screen width is below the breakpoint, `false` otherwise.
 */
export const useResponsive = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => window.innerWidth < breakpoint
  );

  useEffect(() => {
    // Function to check and update whether the screen size is below the breakpoint
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Event listener for screen resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup function to remove event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [breakpoint]);

  return isMobile;
};
