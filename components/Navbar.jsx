import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/images/rashamall-logo.png';
import ProductCategoryNavButton from "@/components/ProductCategoryNavButton";

const Navbar = () => {
  return (
    <nav className='border border-blue-400 flex justify-end'>
        <div className='w-full bg-blue-200 '>
          <div lang="fa" className=' border-b border-blue-400 py-4 px-4 justify-end flex gap-4'>
            <Link className="border border-gray-400 p-2 rounded" href='/'>محصولات حراجی</Link>
            <Link className="border border-gray-400 p-2 rounded"  href='/'>مقایسه محصولات</Link>
            <Link className="border border-gray-400 p-2 rounded" href='/'>مجله راشامال</Link>
            <Link className="border border-gray-400 p-2 rounded" href='/'>تماس با ما</Link>
          </div>
          <div lang='fa' className="p-2 flex justify-end gap-2">
            <ProductCategoryNavButton/>
            <ProductCategoryNavButton/>
            <ProductCategoryNavButton/>
            <ProductCategoryNavButton/>
            <ProductCategoryNavButton/>
            <ProductCategoryNavButton/>
            <ProductCategoryNavButton/>
          </div>
        </div>
        <Link className="flex bg-blue-200 items-center px-2" href='/'>
          <Image 
            className="h-20 w-auto bg-blue-200" 
            src={logo} 
            alt="RashaMall"
          />
        </Link>
    </nav>
  )
}

export default Navbar