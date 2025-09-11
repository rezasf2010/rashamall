import Image from 'next/image';
import pay from '@/assets/images/pay-rashamall.png';
import ret from '@/assets/images/return-rashamall.png';
import call from '@/assets/images/tamas-rashamall.png';
import guarantee from '@/assets/images/zemanat-rashamall.png';
import SemiFooterLinks from './SemiFooterLinks';

const SemiFooter = () => {
  return (
    <div className="bg-gray-100 w-full flex flex-col items-center text-gray-700">
      <div className=" w-full flex flex-col md:flex-row items-center md:items-start justify-center">
        <div className="w-full md:w-1/2 h-full  flex justify-around gap-3">
          <div className="w-1/2  p-4 flex flex-col items-center justify-around">
            <Image
              src={call}
              width={0}
              height={0}
              sizes="100vw"
              className="w-1/2 h-auto  lg:h-40"
              priority={true}
              alt="call"
            />
            <h4 className=" font-bold text-xl text-center ">پشتیبانی 9 صبح تا 6 عصر</h4>
            <p className="text-sm text-wrap text-center hidden lg:block">
              کارشناسان ما در بخش پشتیبانی در پیام رسان واتساپ یا از طریق تلفن های تماس از ساعت 9
              صبح تا 6 عصر آماده خدمت رسانی به شما عزیزان هستند
            </p>
          </div>

          <div className="w-1/2 p-4 flex flex-col items-center gap-2 justify-around">
            <Image
              src={ret}
              width={0}
              height={0}
              sizes="100vw"
              className="w-1/2 h-auto  lg:h-40"
              priority={true}
              alt="return"
            />
            <h4 className=" font-bold text-xl text-center ">7 روز تضمین بازگشت کالا</h4>
            <p className="text-sm text-wrap text-center hidden lg:block">
              7 روز ضمانت بازگشت کالا در صورت ایراد فنی
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full flex justify-around gap-3">
          <div className="w-1/2 p-4 flex flex-col items-center gap-2 justify-around">
            <Image
              src={pay}
              width={0}
              height={0}
              sizes="100vw"
              className="w-1/2 h-auto  lg:h-40"
              priority={true}
              alt="call"
            />
            <h4 className=" font-bold text-xl text-center ">پرداخت در محل</h4>
            <p className="text-sm text-wrap text-center hidden lg:block">
              برای جلب اعتماد شما، پرداخت در محل برای شهر تهران امکان پذیر است
            </p>
          </div>

          <div className="w-1/2 p-4 flex flex-col items-center gap-2 justify-around">
            <Image
              src={guarantee}
              width={0}
              height={0}
              sizes="100vw"
              className="w-1/2 h-auto  lg:h-40"
              priority={true}
              alt="call"
            />
            <h4 className=" font-bold text-xl text-center ">فقط محصولات اصل</h4>
            <p className="text-sm text-wrap text-center hidden lg:block">
              تمام محصولات راشامال اصل، دست اول و برخی محصولات باگارانتی رسمی شرکتی عرضه میشود، و
              تمام گوشی های همراه، رجیستر شده می باشند
            </p>
          </div>
        </div>
      </div>
      <SemiFooterLinks />
    </div>
  );
};

export default SemiFooter;
