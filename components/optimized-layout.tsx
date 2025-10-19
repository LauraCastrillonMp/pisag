"use client";

import { ReactNode, memo } from "react";

interface OptimizedLayoutProps {
  children: ReactNode;
  className?: string;
}

export const OptimizedLayout = memo(function OptimizedLayout({ 
  children, 
  className = "" 
}: OptimizedLayoutProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {children}
    </div>
  );
});
