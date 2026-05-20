'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

const PropertyImages = ({ images }) => {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
            >
              {({ ref, open }) => (
                <div className="relative h-[400px] max-w-[1800px] mx-auto">
                  <Image
                    src={images[0]}
                    ref={ref}
                    onClick={open}
                    alt=""
                    className="object-cover rounded-xl cursor-pointer"
                    fill
                    sizes="100vw"
                  />
                </div>
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    images.length === 3 && index === 2
                      ? 'col-span-2'
                      : 'col-span-1'
                  } relative h-[400px]`}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1000"
                    height="600"
                  >
                    {({ ref, open }) => (
                      <Image
                        src={image}
                        ref={ref}
                        onClick={open}
                        alt=""
                        className="object-cover rounded-xl cursor-pointer"
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
