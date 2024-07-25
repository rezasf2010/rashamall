"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// Create context
const GlobalContext = createContext();

// Create a provider
export function GlobalProvider({ children }) {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState({});
  const [newOrderCount, setNewOrderCount] = useState(0);

  useEffect(() => {
    if (session?.user?.id && typeof window !== "undefined") {
      const userCartKey = `cart_${session.user.id}`;
      // Get the saved cart for the logged-in user from localStorage
      const savedCart = JSON.parse(localStorage.getItem(userCartKey)) || {};
      // Calculate the initial cart count
      const initialCartCount = Object.values(savedCart).reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      setCart(savedCart);
      setCartCount(initialCartCount);
    }
  }, [session]);

  const updateCart = (productId, quantity, price) => {
    if (session?.user?.id) {
      const userCartKey = `cart_${session.user.id}`;
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        if (quantity <= 0) {
          delete newCart[productId];
        } else {
          newCart[productId] = { quantity, price };
        }
        const newCartCount = Object.values(newCart).reduce(
          (acc, item) => acc + item.quantity,
          0,
        );
        setCartCount(newCartCount);
        if (typeof window !== "undefined") {
          localStorage.setItem(userCartKey, JSON.stringify(newCart));
          localStorage.setItem(
            `cartCount_${session.user.id}`,
            JSON.stringify(newCartCount),
          );
        }
        return newCart;
      });
    }
  };

  const clearCart = () => {
    if (session?.user?.id) {
      const userCartKey = `cart_${session.user.id}`;
      setCart({});
      setCartCount(0);
      if (typeof window !== "undefined") {
        localStorage.removeItem(userCartKey);
        localStorage.removeItem(`cartCount_${session.user.id}`);
      }
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
        newOrderCount,
        setNewOrderCount,
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
