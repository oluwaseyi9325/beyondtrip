'use client';
// import { icons } from '@/assets';

import React from 'react';

interface IProp {
  header: string;
  content: string;
}

const FormHeader = ({ header, content }: IProp) => {

  return (
    <div className="flex w-full item-center">
      {/* <Image
        onClick={() => router.back()}
        alt="arrow-left"
        src={icons.arrowLeft}
        width={30}
        height={30}
        className="md:hidden cursor-pointer mr-3"
      /> */}
      <div className="flex flex-col">
        <span className="fontInter font-normal text-[15px] lg:text-[18px]">{header}</span>
        <h1 className="lg:py-1 interFont text-[24px] lg:text-[28px] font-semibold">{content}</h1>
      </div>
    </div>
  );
};

export default FormHeader;
