"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create context
const GlobalContext = createContext();

// Create a provider
export function GlobalProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get the saved cart from localStorage and parse it
      const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
      // Calculate the initial cart count
      const initialCartCount = Object.values(savedCart).reduce(
        (acc, count) => acc + count,
        0,
      );
      setCart(savedCart);
      setCartCount(initialCartCount);
    }
  }, []);

  const updateCart = (productId, quantity) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (quantity <= 0) {
        delete newCart[productId];
      } else {
        newCart[productId] = quantity;
      }
      const newCartCount = Object.values(newCart).reduce(
        (acc, count) => acc + count,
        0,
      );
      setCartCount(newCartCount);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newCart));
        localStorage.setItem("cartCount", JSON.stringify(newCartCount));
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
    setCartCount(0);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartCount");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        cartCount,
        cart,
        setCart,
        updateCart,
        clearCart,
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
