'use client';
import { createContext, useContext, useState } from 'react';

// Create context
const AdminGlobalContext = createContext();

// Create a provider
export function AdminGlobalProvider({ children }) {
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [newMessageCount, setNewMessageCount] = useState(0);

  return (
    <AdminGlobalContext.Provider
      value={{
        newOrderCount,
        setNewOrderCount,
        newMessageCount,
        setNewMessageCount,
      }}
    >
      {children}
    </AdminGlobalContext.Provider>
  );
}

// Create a custom hook to access context
export function useAdminGlobalContext() {
  return useContext(AdminGlobalContext);
}
