"use client";
// /admin
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const AdminPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to /admin/dashboard when /admin is accessed
    router.replace("/admin/dashboard");
    setLoading(false);
  }, [router]);

  return <Spinner loading={loading} />;
};

export default AdminPage;
