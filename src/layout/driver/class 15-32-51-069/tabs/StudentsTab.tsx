"use client"
import Table from "@/components/table";
import TableSkeleton from "@/components/skeleton";
import Button from "@/components/button";
import { GoPlus } from "react-icons/go";

export interface TRegistered {
    accountStatus: string;
    classes: any | null;
    cohorts: any | null;
    emailAddress: string;
    firstName: string;
    id: string;
    identityId: string | null;
    lastName: string;
    middleName: string;
    phoneNumber: string;
}

interface advertisersTabProps {
    advertisers: TRegistered[];
    isLoading: boolean;
    columns: any[];
    onInviteadvertiser: () => void;
}

export const advertisersTab = ({ advertisers, isLoading, columns, onInviteadvertiser }: advertisersTabProps) => {
    // console.log(advertisers, "advertisers in advertisersTab");
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">advertisers</h2>
                <Button
                    size="md"
                    className="max-w-[170px] text-white text-sm font-[600] p-3"
                    hasIcon
                    icon={<GoPlus size={20} />}
                    handleClick={onInviteadvertiser}
                >
                    Invite advertisers
                </Button>
            </div>

            {isLoading ? (
                <TableSkeleton rows={6} />
            ) : (
                <Table<TRegistered>
                    columns={columns}
                    data={advertisers || []}
                />
            )}
        </div>
    );
};
