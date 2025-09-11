import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeCategoriesSection from '@/components/HomeCategoriesSection';

// /
const HomePage = () => {
  return (
    <div className=" w-full gap-4 flex flex-col items-center sm:justify-center lg:justify-center">
      <Hero />
      <InfoBoxes />
      <HomeCategoriesSection />
    </div>
  );
};

export default HomePage;
