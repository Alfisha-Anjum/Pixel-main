"use client";

import React from "react";

interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default LayoutContainer;
