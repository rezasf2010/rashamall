import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const CategoryDropdownItem = ({
  handleDropdownOpen,
  setIsMobileMenuOpen,
  categories,
  category,
  parentSlug,
}) => {
  const categoryId = category._id;
  const subCategories = categories
    .filter((cat) => cat.parent === categoryId)
    .sort((a, b) => a._id.localeCompare(b._id));

  return (
    <div
      id="category-menu"
      className=" md:absolute md:right-0 z-10 mt-2 md:w-48 origin-top-right rounded-md bg-blue-100 md:bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="category-menu-button"
      tabIndex="-1"
    >
      {subCategories.map((subCategory) => (
        <Link
          key={subCategory._id}
          href={`/products/${parentSlug}/${subCategory.slug}-${subCategory._id}`}
          className="flex px-4 py-2 text-sm text-gray-700 border-b border-gray-300 md:border-gray-200 mx-2"
          role="menuitem"
          tabIndex="-1"
          onClick={() => {
            handleDropdownOpen(false);
            setIsMobileMenuOpen(false);
          }}
        >
          {subCategory.fa_name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryDropdownItem;
