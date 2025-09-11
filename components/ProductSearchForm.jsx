'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ProductSearchForm = () => {
  const [searchField, setSearchField] = useState('');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchField === '') {
      router.push('/products');
    } else {
      const query = `?query=${searchField}`;

      router.push(`/products/search-results${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-3 mx-auto w-4/5 md:w-full flex flex-col md:flex-row md:justify-center md:gap-2 items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="search" className="sr-only">
          جستجو
        </label>
        <input
          type="text"
          id="search"
          placeholder="اینجا جستجو کنید ..."
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="md:ml-4 mt-2 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        جستجو
      </button>
    </form>
  );
};

export default ProductSearchForm;
