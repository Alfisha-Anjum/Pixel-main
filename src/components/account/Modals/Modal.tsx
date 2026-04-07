"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";
import { useIsMobile } from "../../../hooks/use-mobile";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
}: ModalProps) => {
  const isMobile = useIsMobile();
  
  if (!isOpen) return null;

  const sizeClasses = {
    sm: isMobile ? "max-w-none" : "max-w-md",
    md: isMobile ? "max-w-none" : "max-w-lg",
    lg: isMobile ? "max-w-none" : "max-w-2xl",
    xl: isMobile ? "max-w-none" : "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={`flex min-h-full items-center justify-center p-4 ${isMobile ? "items-end pb-0" : "p-4"}`}>
        <div 
          className={`relative bg-white ${isMobile ? "rounded-t-2xl rounded-b-none w-full max-h-[90vh]" : `rounded-2xl shadow-xl w-full ${sizeClasses[size]} max-h-[90vh]`} overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className={`flex items-center justify-between p-6 ${isMobile ? "border-b border-gray-200 pb-4" : "border-b border-gray-200"}`}>
              <h2 className={`font-bold text-gray-900 ${isMobile ? "text-lg" : "text-xl"}`}>{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          )}
          
          {/* Content */}
          <div className={`overflow-y-auto ${isMobile ? "p-4 max-h-[calc(90vh-4rem)]" : "p-6 max-h-[calc(90vh-4rem)]"}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};