import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/assets/png/candle.png"
      alt="Candle"
      width={103}
      height={48}
      quality={100}
      priority
    />
  );
};

export default Logo;
