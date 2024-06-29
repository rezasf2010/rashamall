"use client";

import { useParams, useSearchParams, usePathname } from "next/navigation";

const ProductPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const category = params.category;
  const product = params.product;
  const color = searchParams.get("color");

  return (
    <div>
      <p>ProductPage</p>

      <h2>{category}</h2>
      <h2>{product}</h2>
      <h2>{color}</h2>
      <h2>{pathName}</h2>
    </div>
  );
};

export default ProductPage;
