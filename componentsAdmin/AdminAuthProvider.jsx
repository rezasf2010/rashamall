'use client';

import useAuth from '@/utils/adminAuth';
import dynamic from 'next/dynamic';

const Spinner = dynamic(() => import('@/components/Spinner'), { ssr: false });

const AdminAuthProvider = ({ children }) => {
  const { loading, authenticated } = useAuth();

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (!authenticated) {
    return null; // Or you can return a redirect here
  }

  return children;
};

export default AdminAuthProvider;
