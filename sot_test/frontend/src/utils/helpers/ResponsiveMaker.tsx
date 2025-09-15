import React, { useState, useEffect } from "react";

interface PropsType {
  visibleWidth?: number;
  hiddenWidth?: number;
  children: React.ReactNode;
}

const ResponsiveMaker: React.FC<PropsType> = ({
  visibleWidth = 0,
  hiddenWidth = Infinity,
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(
    window.innerWidth >= visibleWidth && window.innerWidth < hiddenWidth
  );

  const handleResize = () => {
    setIsVisible(
      window.innerWidth >= visibleWidth && window.innerWidth < hiddenWidth
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [visibleWidth, hiddenWidth]);

  return isVisible ? <>{children}</> : null;
};

export default ResponsiveMaker;
