
import Tabs from "@/components/tab"
import Container from "@/layout/driver/container"

import { useState } from "react";
import clsx from "clsx";
import { FaUser, FaStar } from "react-icons/fa";
import { BiKey } from "react-icons/bi";
import { MdEdit } from "react-icons/md";



const BasicDetailsContent = () => {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white border border-gray-300 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white text-xl font-bold">
              S
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Samuel Emmaeus</h3>
              <p className="text-sm text-gray-500">sammemma@gmail.com</p>
            </div>
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors">
            Verified
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white border border-gray-300 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          <button className="bg-[#2C4C9C] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#234080] transition-colors flex items-center gap-2">
            <MdEdit size={18} />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">First Name</p>
            <p className="text-sm text-gray-500">Samuel</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Last Name</p>
            <p className="text-sm text-gray-500">Emmaeus</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Email Address</p>
            <p className="text-sm text-gray-500">sammemma@gmail.com</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Phone No.</p>
            <p className="text-sm text-gray-500">08456230345</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Address</p>
            <p className="text-sm text-gray-500">Loremipsum.rdscimse</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Reference</p>
            <p className="text-sm text-gray-500">Loremipsum.rdscimse</p>
          </div>
        </div>
      </div>

      {/* Password Reset */}
      <div className="bg-white border border-gray-300 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Password Reset</h2>
        <p className="text-sm text-gray-600 mb-3">Change your password at any time</p>
        <button className="text-[#2C4C9C] font-medium hover:underline flex items-center gap-2">
          <BiKey size={20} />
          Change password
        </button>
      </div>
    </div>
  );
};

const BankDetailsContent = () => {
  return (
    <div className="space-y-6">
      {/* Bank Details Display */}
      <div className="bg-white border border-gray-300 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Bank/Payment Details</h2>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors">
            Verified
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Name of Bank</p>
            <p className="text-sm text-gray-500">First Bank</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Account Name</p>
            <p className="text-sm text-gray-500">Samuel Emmaeus</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Account Number</p>
            <p className="text-sm text-gray-500">0236594834</p>
          </div>
        </div>
      </div>

      {/* Edit Bank Details */}
      <div className="bg-white border border-gray-300 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Bank/Payment Details</h2>
        <p className="text-sm text-gray-600 mb-3">Change your bank details here</p>
        <button className="text-[#2C4C9C] font-medium hover:underline flex items-center gap-2">
          <BiKey size={20} />
          Change your bank details
        </button>
      </div>
    </div>
  );
};


const RatingsContent = () => {
  const ratings = Array(10).fill({
    date: "2025-08-15",
    time: "11:24am",
    user: "Anonymous...",
    rating: 4,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="space-y-6">
      {/* Ratings Grid */}
      <div className="grid grid-cols-2 gap-4">
        {ratings.map((rating, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-xl p-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white flex-shrink-0">
                <FaUser size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={20}
                      className={star <= rating.rating ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{rating.date}</span>
                    <span className="text-gray-500">{rating.time}</span>
                  </div>
                  <span className="text-gray-900">{rating.user}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-gray-600">Showing 1 to 10 of 250</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
            Previous
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={clsx(
                "h-8 w-8 rounded",
                currentPage === page
                  ? "bg-blue-200 text-blue-800 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const Security = () => {
    const tabsData: any = [
        {
            title: "Basic Details",
            content: <BasicDetailsContent />
        },
        {
            title: "Bank/Payment Details",
            content: <BankDetailsContent />
        },
        {
            title: "View your ratings",
            content: <RatingsContent />
        }
    ];

    return (
        <>
            <Container active="Profile">
                <section className=" py-6 h-full overflow-y-hidden">
                    <Tabs tabs={tabsData} defaultTab={0} />
                </section>
            </Container>


        </>
    )
}

export default Security