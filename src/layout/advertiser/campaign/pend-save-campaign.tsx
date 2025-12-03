"use client";

import Button from "@/components/button";

// ------------------------------------------------
// Types
// ------------------------------------------------
interface Campaign {
  id: string;
  name: string;
  dateCreated: string;
  status?: "approved" | "rejected" | "pending";
}

interface PendingCampaignCardProps {
  campaign: Campaign;
  onMakePayment?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

interface SavedCampaignCardProps {
  campaign: Campaign;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
}

// ------------------------------------------------
// Pending Campaign Card
// ------------------------------------------------
const PendingCampaignCard = ({ campaign, onMakePayment, onViewDetails }: PendingCampaignCardProps) => {
  const getStatusBadge = () => {
    const statusConfig = {
      approved: { text: "Approved", color: "bg-green-50 text-green-600 border-green-200" },
      rejected: { text: "Rejected", color: "bg-red-50 text-red-600 border-red-200" },
      pending: { text: "Pending", color: "bg-orange-50 text-orange-600 border-orange-200" }
    };

    const config = statusConfig[campaign.status || "pending"];

    return (
      <span className={`inline-block px-6 py-2 rounded-full text-sm font-medium border ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="bg-white border border-[#444444] rounded-2xl p-5 sm:p-8">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        {/* Left: Campaign Info */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {campaign.name}
          </h3>
          <p className="text-[13px] text-gray-600">
            <span className="font-semibold">Date Created:</span>{" "}
            {campaign.dateCreated}
          </p>
        </div>

        {/* Right: Action Button & Status */}
        <div className="flex flex-wrap items-center gap-3">
          {campaign.status === "approved" && (
            <Button
              rounded="full"
              size="md"
              handleClick={() => onMakePayment?.(campaign.id)}
              className="!w-auto px-8 bg-[#336AEA] text-white rounded-full font-medium hover:bg-[#2952b8] transition-colors"
            >
              Make Payment
            </Button>
          )}

          {campaign.status === "rejected" && (
            <button
              onClick={() => onViewDetails?.(campaign.id)}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Click to view details
            </button>
          )}

          {getStatusBadge()}
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------
// Saved Campaign Card
// ------------------------------------------------
const SavedCampaignCard = ({ campaign, onEdit, onRemove }: SavedCampaignCardProps) => {
  return (
    <div className="bg-white border border-[#444444] rounded-2xl p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between">
        {/* Left: Campaign Info */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{campaign.name}</h3>
          <p className="text-[13px] mb-2 text-gray-600">
            <span className="font-semibold text-black ">Date Created:</span> {campaign.dateCreated}
          </p>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
             rounded="full"
            size="md"
            handleClick={() => onEdit?.(campaign.id)}
            className="!w-auto px-10 bg-[#336AEA] text-white rounded-full font-medium hover:bg-[#2952b8] transition-colors"
          >
            Edit
          </Button>
          
          <Button
             rounded="full"
            size="md"
            handleClick={() => onRemove?.(campaign.id)}
            variant="border"
            borderColor="#336AEA"
            borderWidth="1"
            className="!w-auto px-8 bg-white text-[#336AEA] rounded-full font-medium  transition-colors"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------
// Main Campaigns Component
// ------------------------------------------------
const PendSaveCampaigns = () => {
  // Sample data - replace with your actual data
  const pendingCampaigns: Campaign[] = [
    {
      id: "1",
      name: "Xtra Ride Boost Campaign",
      dateCreated: "Dec. 20, 2025 1:25pm",
      status: "approved"
    },
    {
      id: "2",
      name: "Xtra Ride Boost Campaign",
      dateCreated: "Dec. 20, 2025 1:25pm",
      status: "rejected"
    },
    {
      id: "3",
      name: "Xtra Ride Boost Campaign",
      dateCreated: "Dec. 20, 2025 1:25pm",
      status: "pending"
    }
  ];

  const savedCampaigns: Campaign[] = [
    {
      id: "4",
      name: "Xtra Ride Boost Campaign",
      dateCreated: "Dec. 20, 2025 1:25pm"
    },
    {
      id: "5",
      name: "Xtra Ride Boost Campaign",
      dateCreated: "Dec. 20, 2025 1:25pm"
    },
    {
      id: "6",
      name: "Xtra Ride Boost Campaign",
      dateCreated: "Dec. 20, 2025 1:25pm"
    }
  ];

  const handleMakePayment = (id: string) => {
    console.log("Make payment for campaign:", id);
    // Add your payment logic here
  };

  const handleViewDetails = (id: string) => {
    console.log("View details for campaign:", id);
    // Add your view details logic here
  };

  const handleEdit = (id: string) => {
    console.log("Edit campaign:", id);
    // Add your edit logic here
  };

  const handleRemove = (id: string) => {
    console.log("Remove campaign:", id);
    // Add your remove logic here
  };

  return (
    <div className="w-full p-8 bg-white min-h-screen rounded-lg">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Pending Campaigns Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Campaigns</h2>
          <div className="space-y-4">
            {pendingCampaigns.map((campaign) => (
              <PendingCampaignCard
                key={campaign.id}
                campaign={campaign}
                onMakePayment={handleMakePayment}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>

        {/* Saved Campaigns Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Campaigns</h2>
          <div className="space-y-4">
            {savedCampaigns.map((campaign) => (
              <SavedCampaignCard
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendSaveCampaigns;