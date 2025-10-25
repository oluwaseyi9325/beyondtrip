import Table from "@/components/table";
import { useCourseColumns } from "./data";
import TableSearchInput from "../table-search-input";
import { useTableSearch } from "@/hooks/use-table-search";
// import Pagination from "@/components/pagination";

export interface TCourse {
  courseName: string;
  tutors: any[];
  applicationFees: any[];
  tuitionFees: any[];
}

const CourseTable = ({ data, onEdit }: { data: TCourse[]; onEdit: (course: TCourse) => void }) => {
  const columns = useCourseColumns({
    handleClick: onEdit, 
    total: data?.length,
  });

  const {
    searchTerm,
    setSearchTerm,
    filteredData:filterCourrse,
    clearSearch,

  } = useTableSearch({
    data: data,
    searchFields: ["courseName", "tutors"],
  })
  return (
    <>
      <div className="p-3">
      <TableSearchInput
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearSearch={clearSearch}
        placeholder="Search course name..."
        className="w-96" // Custom width for this table
      />
     </div>
      <Table<TCourse> columns={columns} data={filterCourrse} />
      {/* <Pagination /> */}
    </>
  );
};

export default CourseTable;


