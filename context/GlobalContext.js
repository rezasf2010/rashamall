"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create context
const GlobalContext = createContext();

// Create a provider
export function GlobalProvider({ children }) {
  const [cartCount, setCartCount] = useState(() => {
    // Get the saved cart from localStorage and parse it
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
    // Calculate the initial cart count
    return Object.values(savedCart).reduce((acc, count) => acc + count, 0);
  });

  const [cart, setCart] = useState(() => {
    // Parse the cart from localStorage or initialize as an empty object
    return JSON.parse(localStorage.getItem("cart")) || {};
  });

  const updateCart = (productId, quantity) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (quantity <= 0) {
        delete newCart[productId];
      } else {
        newCart[productId] = quantity;
      }
      setCartCount(
        Object.values(newCart).reduce((acc, count) => acc + count, 0),
      );
      return newCart;
    });
  };

  // Persist cart and cartCount to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartCount", JSON.stringify(cartCount));
  }, [cart, cartCount]);

  return (
    <GlobalContext.Provider
      value={{
        cartCount,
        cart,
        setCart,
        updateCart,
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
