import clsx from "clsx";
import Image from "next/image";

interface ResponsiveProps {
  src: string;
  alt: string;
  size: string;
}

interface StaticProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const ResponsiveImage = ({ src, alt, size }: ResponsiveProps) => {
  return (
    <div className={clsx("relative aspect-auto", size)}>
      <Image
        src={`/assets/${src}`}
        alt={alt}
        fill
        className="object-contain"
        quality={100}
      />
    </div>
  );
};

export const StaticImage = ({
  src,
  alt,
  width,
  height,
  className,
}: StaticProps) => {
  return (
    <Image
      src={`/assets/${src}`}
      alt={alt}
      width={width}
      height={height}
      className={className}
      quality={100}
    />
  );
};
