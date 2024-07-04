import Image from "next/image";
import Link from "next/link";
import InfoBox from "./InfoBox";
import InfoImageOne from "@/assets/images/infoBox1.jpg";
import InfoImageTwo from "@/assets/images/infoBox2.jpg";
import InfoImageThree from "@/assets/images/infoBox3.jpg";

const InfoBoxes = () => {
  return (
    <section>
      <div className="lg:container m-auto">
        <div className="mx-auto flex flex-col items-center">
          <div className="grid grid-cols-1 w-11/12 sm:w-3/4 md:w-auto md:grid-cols-3 gap-4 p-4 rounded-lg">
            <InfoBox>
              <Image
                className="w-full rounded-xl"
                src={InfoImageOne}
                alt="infoBoxOne"
                priority={true}
              />
            </InfoBox>
            <InfoBox>
              <Image
                className="w-full rounded-xl"
                src={InfoImageTwo}
                alt="infoBoxOne"
                priority={true}
              />
            </InfoBox>

            <InfoBox>
              <Link href="/">
                <Image
                  className="w-full rounded-xl"
                  src={InfoImageThree}
                  alt="infoBoxOne"
                  priority={true}
                />
              </Link>
            </InfoBox>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
