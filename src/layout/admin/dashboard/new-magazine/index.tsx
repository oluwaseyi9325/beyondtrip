"use client";

export const NewMagazines = () => {

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 ">
        <div className="flex gap-x-2 font-semibold  text-xs text-center "  > 
            <button className="border border-[#008000]  px-4  py-1 text-[#008000] rounded-full  "  > Active </button>
            <button className="text-[#00000080] px-4 py-1 w-full border  border-[#00000080] rounded-full "  >"Edition Name" </button>
        </div>
      <h2 className="text-xl font-bold text-black pb-4  mt-4 border-b-[1px]  border-[#00000040] ">New Magazines Distribution</h2>
        <div className="mt-4 flex justify-between items-center  " >
            <div>
               <h1  className=" text-black text-xs font-[500]  " > Total Printed </h1>
               <p className=" text-[#00000080] text-base font-bold  " >5,000 </p>    
            </div>

            <div>
               <h1  className=" text-black text-xs font-[500]  " > Picked Up </h1>
               <p className=" text-[#00000080] text-base font-bold  " >4,500 </p>    
            </div>

            <div>
               <h1  className=" text-black text-xs font-[500]  " > Not Picked </h1>
               <p className=" text-[#00000080] text-base font-bold  " >500 </p>    
            </div>
        </div>    


    </div>
  );
};
