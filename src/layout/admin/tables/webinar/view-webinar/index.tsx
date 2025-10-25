import Table from "@/components/table";
import { useRegisteredColumns } from "./data";
import ViewStudent from "@/layout/general/modals/student/view-student";
import { useState } from "react";
import { useTableSearch } from "@/hooks/use-table-search";
import TableSearchInput from "../../table-search-input";
import { IoArrowBack } from "react-icons/io5";

export interface TRegistered {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  joiningAs: string;
  phoneNumber: string;
}

const WebinarsRegistraionTable = ({data, webinarName}:any) => {
  const [viewStudentOpen, setViewStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<TRegistered | null>(null);


  // const { data: webinarData,isLoading } = useGetWebinars()

  const rawData = data?.data || [];
  console.log("Webinar regggggggggggg Data raw:", rawData);


  // ✅ Step 2: Apply select filters


  // ✅ Step 3: Apply search on filtered data
  const {
    searchTerm,
    setSearchTerm,
    filteredData: filteredStudents,
    clearSearch,
    totalResults,
  } = useTableSearch({
    data: rawData,
    searchFields: ["fullName","email", "phoneNumber","company"],
  });

  // ✅ Columns definition
  const columns = useRegisteredColumns({
    handleClickView: (row) => {
      setSelectedStudent(row);
      setViewStudentOpen(true);
    },
    handleAddToClass: (id: string) => console.log("Add to class:", id),
    total: totalResults,
  });

  return (
    <>
      <ViewStudent
        data={selectedStudent}
        open={viewStudentOpen}
        handleClose={() => {
          setViewStudentOpen(false);
          setSelectedStudent(null);
        }}
      />

      <section className="container">
        <div className="pt-4 pb-4 px-4 flex justify-between flex-wrap gap-4">
          <div className="flex items-center gap-5">
          <IoArrowBack size={25} className="cursor-pointer" onClick={() => history.back()} />
          <p className="header flex">
              WEBINARS-REGITRATIONS 
              <div className="text-black"> {`>`} {webinarName}</div>
            </p>
        </div>

          
        </div>
        <div className="flex justify-between items-center px-4 mb-3">
        <TableSearchInput
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClearSearch={clearSearch}
            placeholder="Search by name,email,phonenumber..."
            className="w-96"
          />
      
       </div>

       <Table<TRegistered> columns={columns} data={filteredStudents} />

      </section>
    </>
  );
};

export default WebinarsRegistraionTable;
