"use client";

import React, { createContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  serviceId: string;
  serviceName: string;
  subService: string;
  capacity?: string;
  amc?: string;
  price: number;
  image: string;
  duration: string;
  rating: number;
  reviews: number;
}

export interface BookingContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  selectedAddress: any | null;
  setSelectedAddress: (address: any) => void;
  acceptedTC: boolean;
  setAcceptedTC: (value: boolean) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [acceptedTC, setAcceptedTC] = useState(false);

  const addToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value: BookingContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    selectedAddress,
    setSelectedAddress,
    acceptedTC,
    setAcceptedTC,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = React.useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
