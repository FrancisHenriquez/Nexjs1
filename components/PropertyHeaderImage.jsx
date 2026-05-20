import Image from 'next/image';

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="relative h-[400px]">
          <Image
            src={image}
            alt=""
            className="object-cover"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
