// "use client";

// import React from "react";
// import Table from "@/components/table";
// import { TableColumn } from "react-data-table-component";
// // import { PiCaretDown } from "react-icons/pi";
// import Pagination from "@/components/pagination";
// import SelectSearch from "@/components/input/selectSearch";
// import DateSort from "@/components/input/dateSort";

// type EditionStatus = "Picked" | "Not Picked" | "Returned";

// type Edition = {
//   id: string;
//   date: string;
//   location: string;
//   title: string;
//   status: EditionStatus;
// };

// const EDITIONS_MOCK: Edition[] = [
//   {
//     id: "1",
//     date: "2025-08-05",
//     location: "Lagos, Nigeria",
//     title: "March Edition (Issue Vol. 08)",
//     status: "Picked",
//   },
//   {
//     id: "2",
//     date: "2025-08-05",
//     location: "Lagos, Nigeria",
//     title: "March Edition (Issue Vol. 08)",
//     status: "Not Picked",
//   },
//   {
//     id: "3",
//     date: "2025-08-05",
//     location: "Lagos, Nigeria",
//     title: "March Edition (Issue Vol. 08)",
//     status: "Returned",
//   },
//   {
//     id: "4",
//     date: "2025-08-05",
//     location: "Lagos, Nigeria",
//     title: "March Edition (Issue Vol. 08)",
//     status: "Picked",
//   },
//   {
//     id: "5",
//     date: "2025-08-05",
//     location: "Lagos, Nigeria",
//     title: "March Edition (Issue Vol. 08)",
//     status: "Not Picked",
//   },
  
//   {
//     id: "8",
//     date: "2025-08-05",
//     location: "Lagos, Nigeria",
//     title: "March Edition (Issue Vol. 08)",
//     status: "Picked",
//   },
//   {
//     id: "9",
//     date: "2025-08-05",
//     location: "Lagos, Nigeria",
//     title: "March Edition (Issue Vol. 08)",
//     status: "Picked",
//   },
// ];

// const StatusPill = ({ status }: { status: EditionStatus }) => {
//   const getStatusStyle = () => {
//     switch (status) {
//       case "Picked":
//         return {
//           container: "border border-[#008000] text-[#008000] ",
//         };
//       case "Not Picked":
//         return {
//           container: "border border-[#008000] text-[#008000] ",
//         };
//       case "Returned":
//         return {
//           container: "border border-[#F29339] text-[#F29339] ",
//         };
//       default:
//         return {
//           container: "border border-[#008000] text-[#008000]",
//         };
//     }
//   };

//   const styles = getStatusStyle();

//   return (
//     <span
//       className={`items-center justify-center w-[110px] text-center gap-2 rounded-full py-2 px-2 text-sm  ${styles.container}`}
//     >
//       {status}
//     </span>
//   );
// };

// function HistoryMagazineTable({magazineData}:any) {
//   const [currentPage, setCurrentPage] = React.useState(1);
//   const itemsPerPage = 10;

//   const columns: TableColumn<Edition>[] = [
//     {
//       name: "Date",
//       selector: (row) => row.date,
//       grow: 1,
//       minWidth: "120px",
//     },
//     {
//       name: "Location",
//       selector: (row) => row.location,
//       minWidth: "150px",
//     },
//     {
//       name: "Title/Description",
//       selector: (row) => row.title,
//       minWidth: "200px",
//     },
//     {
//       name: "Status",
//       cell: (row) => <StatusPill status={row.status} />,
//       center: true,
//       minWidth: "160px",
//     },
//   ];

//   const totalPages = Math.ceil(EDITIONS_MOCK.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const pageData = EDITIONS_MOCK.slice(startIndex, endIndex);

//   return (
//     <div className="space-y-4">
//       <div className="flex w-full items-center justify-between flex-wrap gap-4 py-5">
//         <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
//           History Of Magazines
//         </h2>
//         <div className="flex flex-col sm:flex-row items-start gap-3 w-full sm:w-auto">
//           <SelectSearch
//             options={[
//               { value: "picked", label: "Picked" },
//               { value: "not-picked", label: "Not Picked" },
//               { value: "returned", label: "Returned" },
//             ]}
//             placeholder="Status"
//           />
//           <DateSort
//             onDateChange={(dates) => console.log("Dates changed:", dates)}
//           />
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <Table<Edition> columns={columns} data={pageData} />
//       </div>
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//         totalItems={EDITIONS_MOCK.length}
//         itemsPerPage={itemsPerPage}
//       />
//     </div>
//   );
// }

// export default HistoryMagazineTable;


"use client";

import React from "react";
import Table from "@/components/table";
import { TableColumn } from "react-data-table-component";
import Pagination from "@/components/pagination";
import SelectSearch from "@/components/input/selectSearch";
import DateSort from "@/components/input/dateSort";

type EditionStatus = "Picked" | "Not Picked" | "Returned";

type Magazine = {
  id: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  barcode: string | null;
  barcodeImage: string | null;
  qrImageUrl: string | null;
  tags: string[];
  readStatus: {
    isRead: boolean;
    readAt: string | null;
    readProgress: number;
  };
};

type Edition = {
  id: string;
  date: string;
  location: string;
  title: string;
  status: EditionStatus;
};

const StatusPill = ({ status }: { status: EditionStatus }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "Picked":
        return {
          container: "border border-[#008000] text-[#008000]",
        };
      case "Not Picked":
        return {
          container: "border border-[#FF0000] text-[#FF0000]",
        };
      case "Returned":
        return {
          container: "border border-[#F29339] text-[#F29339]",
        };
      default:
        return {
          container: "border border-[#008000] text-[#008000]",
        };
    }
  };

  const styles = getStatusStyle();

  return (
    <span
      className={`items-center justify-center w-[110px] text-center gap-2 rounded-full py-2 px-2 text-sm ${styles.container}`}
    >
      {status}
    </span>
  );
};

function HistoryMagazineTable({ magazineData }: { magazineData?: Magazine[] }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const statusFilter="";
  // const [statusFilter, setStatusFilter] = React.useState<string>("");
  const [dateRange, setDateRange] = React.useState<any>(null);
  const itemsPerPage = 10;

  // Transform magazine data to edition format
  const transformMagazineToEdition = (magazine: Magazine): Edition => {
    // Determine status based on readStatus
    let status: EditionStatus = "Not Picked";
    
    if (magazine.readStatus.isRead) {
      status = "Picked";
    } else if (magazine.readStatus.readProgress > 0) {
      status = "Picked";
    }
    
    // You can add logic for "Returned" status based on your business logic
    // For now, keeping it simple

    return {
      id: magazine.id,
      date: formatDate(magazine.publishedAt),
      location: "Lagos, Nigeria", // Default location, update based on your data
      title: magazine.title,
      status: status,
    };
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Transform all magazine data
  const editions: Edition[] = magazineData
    ? magazineData.map(transformMagazineToEdition)
    : [];

  // Filter by status
  const filteredEditions = statusFilter
    ? editions.filter((edition) => {
        if (statusFilter === "picked") return edition.status === "Picked";
        if (statusFilter === "not-picked") return edition.status === "Not Picked";
        if (statusFilter === "returned") return edition.status === "Returned";
        return true;
      })
    : editions;

  // Filter by date range if needed
  const finalEditions = dateRange
    ? filteredEditions.filter((edition) => {
        const editionDate = new Date(edition.date);
        const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
        const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;
        
        if (startDate && editionDate < startDate) return false;
        if (endDate && editionDate > endDate) return false;
        return true;
      })
    : filteredEditions;

  const columns: TableColumn<Edition>[] = [
    {
      name: "Date",
      selector: (row) => row.date,
      grow: 1,
      minWidth: "120px",
    },
    {
      name: "Location",
      selector: (row) => row.location,
      minWidth: "150px",
    },
    {
      name: "Title/Description",
      selector: (row) => row.title,
      minWidth: "200px",
    },
    {
      name: "Status",
      cell: (row) => <StatusPill status={row.status} />,
      center: true,
      minWidth: "160px",
    },
  ];

  const totalPages = Math.ceil(finalEditions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = finalEditions.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, dateRange]);

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-between flex-wrap gap-4 py-5">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          History Of Magazines
        </h2>
        <div className="flex flex-col sm:flex-row items-start gap-3 w-full sm:w-auto">
          <SelectSearch
            options={[
              { value: "picked", label: "Picked" },
              { value: "not-picked", label: "Not Picked" },
              { value: "returned", label: "Returned" },
            ]}
            placeholder="Status"
            // onChange={(value) => setStatusFilter(value)}
          />
          <DateSort
            onDateChange={(dates) => {
              console.log("Dates changed:", dates);
              setDateRange(dates);
            }}
          />
        </div>
      </div>
      
      {finalEditions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg">No magazines found</p>
          <p className="text-gray-400 text-sm mt-2">
            {statusFilter || dateRange
              ? "Try adjusting your filters"
              : "Magazines will appear here once available"}
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table<Edition> columns={columns} data={pageData} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={finalEditions.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
}

export default HistoryMagazineTable;