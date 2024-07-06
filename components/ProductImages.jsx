import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const ProductImages = ({ images }) => {
  return (
    <Gallery>
      <section className="p-4 rounded-xl shadow-lg">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="400"
              height="400"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt=""
                  className="object-cover h-[300px] mx-auto rounded-xl p-1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Item
                  original={images[0]}
                  thumbnail={images[0]}
                  width="400"
                  height="400"
                >
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={images[0]}
                      alt=""
                      className="object-cover h-[300px] w-full rounded-xl"
                      width={0}
                      height={0}
                      sizes="100vw"
                      priority={true}
                    />
                  )}
                </Item>
              </div>
              <div className="col-span-1 md:col-span-2">
                <div className="grid grid-cols-3 gap-1">
                  {images.slice(1).map((image, index) => (
                    <div key={index} className="col-span-1">
                      <Item
                        original={image}
                        thumbnail={image}
                        width="400"
                        height="400"
                      >
                        {({ ref, open }) => (
                          <Image
                            ref={ref}
                            onClick={open}
                            src={image}
                            alt=""
                            className="object-contain h-[100px] w-[100px] rounded-xl border border-gray-200 shadow-lg"
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority={true}
                          />
                        )}
                      </Item>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default ProductImages;
