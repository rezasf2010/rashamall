"use client";

import useAuth from "@/utils/adminAuth";
import Spinner from "@/components/Spinner";

const AdminAuthProvider = ({ children }) => {
  const { loading, authenticated } = useAuth();

  console.log(authenticated);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (!authenticated) {
    return null; // Or you can return a redirect here
  }

  return children;
};

export default AdminAuthProvider;
