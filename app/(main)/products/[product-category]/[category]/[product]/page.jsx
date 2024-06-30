"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, usePathname } from "next/navigation";
import Spinner from "@/components/Spinner";

const ProductPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  return <div>ProductPage</div>;
};

export default ProductPage;
