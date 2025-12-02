import Button from '@/components/button';
import PickupConfirm from '@/layout/general/modals/magazine/pickup-confirm';
import ReturnConfirm from '@/layout/general/modals/magazine/return-confirm';
import React, { useState } from 'react'

interface Magazine {
  id: number;
  status: "pending_return" | "pending_pickup" | "active" | "returned";
  edition?: string;
  newEdition?: string;
  location?: string;
  buttonText: string;
  buttonAction?: () => void;
}

function MagazineItem({ magazine }: { magazine: Magazine }) {
  const [isPickup, setIsPickup] = useState(false);
  const [isReturn, setIsReturn] = useState(false);

  const getStatusBadge = () => {
    const statusConfig = {
      pending_return: { text: "Pending Return", color: "bg-orange-50 text-orange-600 border-orange-200" },
      pending_pickup: { text: "Pending Pickup", color: "bg-orange-50 text-orange-600 border-orange-200" },
      active: { text: "Active", color: "bg-green-50 text-green-600 border-green-200" },
      returned: { text: "Returned", color: "bg-gray-50 text-gray-600 border-gray-200" }
    };

    const config = statusConfig[magazine.status];

    return (
      // <div></div>
      <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium border ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const confirmBtn = () => {
    // Check button text or status to determine which modal to open
    if (magazine.buttonText === "Confirm Pickup" || magazine.status === "pending_pickup") {
      setIsPickup(true);
    } else if (magazine.buttonText === "Confirm Return" || magazine.status === "pending_return") {
      setIsReturn(true);
    } else {
      // For other button types (View Details, View History, etc.)
      if (magazine.buttonAction) {
        magazine.buttonAction();
      }
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap gap-2 items-start justify-between">
          <div className="flex-1">
            {/* Status Badge */}
            <div className="mb-6">
              {getStatusBadge()}
            </div>

            {/* Magazine Details */}
            <div className="space-y-2">
              {magazine.edition && (
                <div className="flex whitespace-nowrap items-center gap-2">
                  <span className="text-base font-bold text-gray-900">Last Edition:</span>
                  <span className="text-base  text-gray-500">{magazine.edition}</span>
                </div>
              )}

              {magazine.newEdition && (
                <div className="flex items-center whitespace-nowrap gap-2">
                  <span className="text-base font-bold text-gray-900">New Edition:</span>
                  <span className="text-base text-gray-500">{magazine.newEdition}</span>
                </div>
              )}

              {magazine.location && (
                <div className="flex whitespace-nowrap items-center gap-2">
                  <span className="text-base font-bold text-gray-900">Location:</span>
                  <span className="text-base text-gray-500">{magazine.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="gap-6">
            <Button
              rounded='full'
              size='md'
              handleClick={confirmBtn}
              className="w-auto! bg-[#336AEA] text-white px-8 text-sm rounded-full font-medium hover:bg-[#2952b8] transition-colors whitespace-nowrap"
            >
              {magazine.buttonText}
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PickupConfirm 
        open={isPickup} 
        handleClose={() => setIsPickup(false)} 
        data={magazine} 
      /> 
      <ReturnConfirm 
        open={isReturn} 
        handleClose={() => setIsReturn(false)} 
        data={magazine} 
      />
    </>
  )
}

export default MagazineItem;