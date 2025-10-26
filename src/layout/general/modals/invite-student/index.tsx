import Button from "@/components/button";
import Search from "@/components/input/search";
import Modal from "@/components/modal";
import Table from "@/components/table";
import { useGetadvertisers, useInviteadvertiser } from "@/services/advertiser.service";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { advertiserColumns } from "./data";
import TableSkeleton from "@/components/skeleton";
import toast from "react-hot-toast";
import { SelectFilter, useSelectFilters } from "@/layout/admin/tables/SelectFilter";
import { SelectFilterDropdown } from "@/layout/admin/tables/select-filter-dropdown";
import { useGetCohorts } from "@/services/cohort.service";

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
  classId?: string;
}

interface Tadvertiser {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  data?: any
}

export interface TAddAdmin {
  email: string;
}

const Inviteadvertiser = ({ open, handleClose, refetch, classId }: TModal) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const { data: cohorts } = useGetCohorts({
    PageSize: 30,
  });
  console.log(cohorts?.items, "getting cojort")
  const uniqueNotes = [...new Set(cohorts?.items?.map((cohort: any) => cohort.note))];
  // Your hardcoded cohort data
  // const cohortOptions = ["Cohort 2", "Cohort 7", "Cohort 8", "Cohort 9"];
  const cohortOptions: any = uniqueNotes;

  // const [selectedCohort, setSelectedCohort] = useState("");
  const [selected, setSelected] = useState<any>([]);
  // const [debouncedCohort] = useDebounce(selectedCohort, 300);

  const { data: advertisers, isLoading } = useGetadvertisers({
    SearchKey: debouncedSearch,
    // CohortId: debouncedCohort || undefined,
  });

  console.log("advertisers", advertisers);

  const { mutateAsync: inviteadvertiser, isPending } = useInviteadvertiser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classId || selected.length === 0) {
      toast.error("No advertiser was selected");
      return;
    }

    try {
      await Promise.all(
        selected.map((s: any) => inviteadvertiser({ classId, advertiserId: s.id }))
      );

      toast.success("advertisers invited successfully");
      refetch?.();
      handleClose();
    } catch (err) {
      console.error("Error inviting advertisers:", err);
    }
  };

  const selectFilters: SelectFilter[] = [
    {
      key: "cohort",
      label: "Cohort",
      getValue: (item: any) => item.cohorts?.[0]?.note,
    },
  ];

  const {
    filteredData: filteredBySelects,
    selectedFilters,
    // filterOptions,
    updateFilter,
  } = useSelectFilters({
    data: advertisers?.data?.items,
    filters: selectFilters,
  });

  return (
    <Modal open={open} handleClose={handleClose} className="w-[650px] p-14">
      <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit}>
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          Invite advertiser
        </p>

        <section className="h-[50vh] w-full flex flex-col gap-4 overflow-y-hidden">
          <div className="flex gap-5">
            <Search
              search={search}
              handleChange={(e) => setSearch(e.target.value)}
            />
            <div className="pb-4 flex flex-wrap gap-2">
              {/* Custom cohort dropdown using hardcoded options but integrated with filter system */}
              <SelectFilterDropdown
                label="Cohort"
                value={selectedFilters["cohort"] || ""}
                options={cohortOptions}
                onValueChange={(val: any) => updateFilter("cohort", val)}
              />
            </div>
          </div>

          <section className="w-full h-[40vh] overflow-y-auto">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <Table<Tadvertiser>
                columns={advertiserColumns}
                data={filteredBySelects as Tadvertiser[]}
                selectableRows
                handleSelectedRows={(rows) => setSelected(rows.selectedRows)}
              />
            )}
          </section>
        </section>

        <Button
          type="submit"
          className="w-full text-white font-[700]"
          disabled={isPending}
        >
          {isPending ? "Inviting..." : "Invite advertiser"}
        </Button>
      </form>
    </Modal>
  );
};

export default Inviteadvertiser;