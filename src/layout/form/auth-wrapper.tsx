'use client';

import Image from 'next/image';
import React, { ReactNode } from 'react';
import { LogoIcon } from '~/assets/icons/login';

const AuthWrapper = ({
  children,
  allign = 'center',

}: {
  children: ReactNode;
  allign?: string;
  image?: string;
}) => {
  return (
    <main className="flex relative flex-col lg:flex-row">
      <div className="lg:h-screen relative h-[360px] lg:w-[50%] bg-no-repeat">
        <Image
          alt="driver-img"
          src={`/assets/png/driver-login.svg`}
          width={500}
          height={500}
          className="w-full lg:h-full h-[360px] object-cover lg:object-cover"
        />
      </div>
      <div
        className={`h-[180px] w-[7px] mt-[32%] rounded-tr-[12px] hidden lg:flex rounded-br-[10px] bg-[#336AEA]`}
      ></div>
      <div className="absolute  lg:relative lg:top-0 top-[250px] lg:rounded-none rounded-[70px] z-20 bg-white w-full lg:w-[50%] justify-center flex flex-col  lg:px-24">
        <div
          className={`w-full flex items-center ${allign === 'justify-center' ? 'justify-start' : 'lg:justify-start justify-center'} pt-8  mb-8 lg:mb-12`}
        >
          <LogoIcon />
        </div>
        {children}
      </div>
    </main>
  );
};

export default AuthWrapper;
