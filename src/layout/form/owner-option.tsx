import React, { Dispatch, FC, SetStateAction } from 'react';
import Image from 'next/image';
// import { cn } from '@/app/utils/class.util';
// import { icons } from '@/assets';

interface IOwnerOption {
  setOwner: Dispatch<SetStateAction<IOwner>>;
  owner: IOwner;
  image: string;
  activeImage: string;
  type: IOwner;
  content: string;
  className?: string;
}

type IOwner = 'driver' | 'advertiser' | '';

const OwnerOption: FC<IOwnerOption> = ({
  setOwner,
  content,
  type,
  owner,
  activeImage,
  image,
  className,
}) => {
  const isActive = owner === type;
  return (
    <div
      onClick={() => setOwner(prev => (prev === type ? '' : type))}
    //   className={cn(
    //     'flex w-[50%] lg:w-[230px] rounded-[12px] h-[201px] cursor-pointer flex-col relative items-center justify-center',
    //     isActive ? 'bg-[#27458F]' : 'border border-[#44444480]'
    //   )}
    >
      <Image
        src={isActive ? activeImage : image}
        alt="Driver"
        className={`min-h-[99px] ${className}`}
        width={72}
        height={99}
      />
      <span className={`py-2 ${owner === type ? 'text-white' : 'text-black'}`}>{content}</span>
      {/* {isActive && (
        <Image
        //   src={icons.successLogo}
          alt="success"
          className="absolute top-4 right-4"
          width={24}
          height={24}
        />
      )} */}
    </div>
  );
};

export default OwnerOption;
