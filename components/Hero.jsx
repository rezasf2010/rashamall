import ProductSearchForm from "./ProductSearchForm";
import Image from "next/image";
import heroImg from "@/assets/images/heroImg1.jpg";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-blue-200 mb-4 w-full flex flex-col items-center">
      <div className="w-full lg:w-11/12 flex flex-col items-center">
        <Image
          className="w-full bg-blue-200"
          src={heroImg}
          alt="Hero"
          priority={true}
        />
        <ProductSearchForm />
      </div>
    </section>
  );
};

export default Hero;
