"use client";

import { useState } from "react";

export const PastMagazines = () => {
    const [editionName, setEditionName] = useState("");

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 ">
        <div className="flex gap-x-2 font-semibold  text-xs text-center "  > 
        <select
            value={editionName}
            onChange={(e) => setEditionName(e.target.value)}
            className="px-4 focus:outline-none  py-1 border border-gray-300 rounded-[4px] text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <option>"Edition Name"</option>
            
          </select>
        </div>
      <h2 className="text-xl font-bold text-black pb-4  mt-4 border-b-[1px]  border-[#00000040] ">Past Magazines Records</h2>
        <div className="mt-4 flex justify-between items-center  " >
            <div>
               <h1  className=" text-black text-xs font-[500]  " > Total Printed </h1>
               <p className=" text-[#00000080] text-base font-bold  " >5,000 </p>    
            </div>

            <div>
               <h1  className=" text-black text-xs font-[500] " > Picked Up </h1>
               <p className=" text-[#00000080] text-base font-bold  " >4,500 </p>    
            </div>

            <div>
               <h1  className=" text-black text-xs font-[500]  " > Not Picked </h1>
               <p className=" text-[#00000080] text-base font-bold  " >500 </p>    
            </div>

            <div>
               <h1  className=" text-black text-xs font-[500]  " > Returned  </h1>
               <p className=" text-[#00000080] text-base font-bold  " > 4,200 </p>    
            </div>

        </div>    


    </div>
  );
};
