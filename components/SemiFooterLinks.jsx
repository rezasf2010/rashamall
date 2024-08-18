import Image from "next/image";
import Link from "next/link";
import trustLogo from "@/assets/images/trust-logo.png";

const SemiFooterLinks = () => {
  return (
    <div className="bg-gray-100 w-full flex justify-between items-center p-6 text-gray-700">
      {/* Links Section */}
      <div className="w-full sm:w-auto">
        <ul className="text-right space-y-2 sm:space-y-0 sm:space-x-4 sm:flex sm:flex-row sm:text-sm sm:gap-3 text-xs">
          <li>
            <Link href="/faq" className="hover:underline">
              سوالات متداول
            </Link>
          </li>
          <li>
            <Link href="/contact_us" className="hover:underline">
              تماس با ما
            </Link>
          </li>
          <li>
            <Link href="/about_us" className="hover:underline">
              درباره راشامال
            </Link>
          </li>
          <li>
            <Link href="/rasha_rules" className="hover:underline">
              قوانین و مقرارات فروشگاه
            </Link>
          </li>
          <li>
            <Link href="/user_privacy" className="hover:underline">
              سیاست حفظ حریم شخصی مشتریان
            </Link>
          </li>
        </ul>
      </div>

      {/* Logo Section */}
      <div className="w-full sm:w-auto flex justify-center sm:justify-start mb-4 sm:mb-0">
        <Link
          href="https://logo.samandehi.ir/Verify.aspx?id=272840&p=uiwkjyoeuiwkmcsiaodsobpd"
          passHref
          legacyBehavior
        >
          <a target="_blank" rel="noopener noreferrer">
            <Image
              src={trustLogo}
              alt="نشانه اعتماد الکترونیک"
              width={120}
              height={120}
              className="h-auto"
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SemiFooterLinks;
