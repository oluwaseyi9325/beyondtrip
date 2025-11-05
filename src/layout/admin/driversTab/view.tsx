import React from 'react';
import { DriverRow } from '@/layout/admin/tables/admin/data';
import { LuEye, LuArrowRight } from 'react-icons/lu';
import MagazineTable from '@/layout/driver/tables/magazines';
import { MAGAZINE_MOCK } from "@/layout/driver/tables/magazines/data";

interface ViewTabProps {
    driver: DriverRow;
    setActiveTab: (index: number) => void;
}

function ViewTab({ driver, setActiveTab }: ViewTabProps) {
    return (
        <div className="bg-[#F7F7F7] max-w-[600px] space-y-6 overflow-x-hidden">
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* Basic Details */}
                <div className="bg-white rounded-lg p-5">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Basic Details</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm text-gray-600">Email Address:</label>
                            <p className="text-base font-medium">john@example.com</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Phone No:</label>
                            <p className="text-base font-medium">08345687293</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Address:</label>
                            <p className="text-base font-medium">{driver.location}</p>
                        </div>
                    </div>
                </div>

                {/* Bank/Payment Details */}
                <div className="bg-white  rounded-lg p-5">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Bank/Payment Details</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm text-gray-600">Bank Name</label>
                            <p className="text-base font-medium">Wema Bank</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Account No</label>
                            <p className="text-base font-medium">9821643439</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Account Name</label>
                            <p className="text-base font-medium">{driver.name}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* Verification Documents */}
                <div className="bg-white rounded-lg p-5">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Verification Documents</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                {/* <LuCheckCircle className="text-green-600" size={20} /> */}
                                <span className="text-base font-medium truncate">Drivers License</span>
                            </div>
                            <button className="flex items-center gap-1 text-blue-600 text-sm hover:underline flex-shrink-0">
                                <LuEye size={16} />
                                view
                            </button>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                {/* <LuCheckCircle className="text-green-600" size={20} /> */}
                                <span className="text-base font-medium truncate">National ID</span>
                            </div>
                            <button className="flex items-center gap-1 text-blue-600 text-sm hover:underline flex-shrink-0">
                                <LuEye size={16} />
                                view
                            </button>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                {/* <LuCheckCircle className="text-green-600" size={20} /> */}
                                <span className="text-base font-medium truncate">Vehicle Registration Documents</span>
                            </div>
                            <button className="flex items-center gap-1 text-blue-600 text-sm hover:underline flex-shrink-0">
                                <LuEye size={16} />
                                view
                            </button>
                        </div>
                    </div>
                </div>

                {/* Engagement */}
                <div className="bg-white  rounded-lg p-5">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Engagement</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm text-gray-600">Earnings:</label>
                            <p className="text-base font-semibold">{driver.earnings}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="text-sm text-gray-600">Scans:</label>
                            <p className="text-base font-semibold">{driver.scans}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="text-sm text-gray-600">Points:</label>
                            <p className="text-base font-semibold">{driver.points}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Ratings Button */}
            <button onClick={() => setActiveTab(1)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                Click to view ratings/comments
                <div className="bg-white/20 rounded-full p-1">
                    <LuArrowRight size={16} />
                </div>
            </button>

            {<MagazineTable data={MAGAZINE_MOCK} />}

        </div>
    );
}

export default ViewTab;

