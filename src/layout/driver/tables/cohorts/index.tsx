import Table from "@/components/table";
import { cohortColumns } from "./data";
// import Pagination from "@/components/pagination";

export interface TCohort {
  note: string;
  startDate: string;
  endDate: string;
}

const CohortTable = ({ data }: { data: TCohort[] }) => {
  return (
    <>
      <Table<TCohort> columns={cohortColumns} data={data} />
      {/* <Pagination /> */}
    </>
  );
};

export default CohortTable;
