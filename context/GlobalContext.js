"use client";
import { set } from "mongoose";
import { createContext, useContext, useState, useEffect } from "react";

// Creat context
const GlobalContext = createContext();

// Create a provider
export function GlobalProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState({});

  useEffect(() => {
    // Clear cart on page refresh
    localStorage.removeItem("cart");
    localStorage.removeItem("cartCount");

    // Set initial cart state
    setCart({});
    setCartCount(0);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
    const savedCartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;
    setCart(savedCart);
    setCartCount(savedCartCount);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartCount", JSON.stringify(cartCount));
  }, [cart, cartCount]);

  return (
    <GlobalContext.Provider
      value={{
        cartCount,
        setCartCount,
        cart,
        setCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hook to access context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
