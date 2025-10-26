import Table from "@/components/table";
import { advertiserColumns, advertiserData } from "./data";
import Pagination from "@/components/pagination";

export interface Tadvertiser {
  advertiser_name: string;
  program: string;
  gender: string;
  cohort: string;
  payment_status: string;
  joined_date: string;
  status: string;
}

interface CourseTableProps {
  onViewCourse: (course: Tadvertiser) => void;
  onUploadMaterials: (course: Tadvertiser) => void;
}

const advertiserTable = ({
  onViewCourse,
  onUploadMaterials,
}: CourseTableProps) => {
  const columns = advertiserColumns(onViewCourse, onUploadMaterials);

  return (
    <>
      <Table<Tadvertiser> columns={columns} data={advertiserData} />
      <Pagination currentPage={1} totalPages={1} onPageChange={() => null} />
    </>
  );
};

export default advertiserTable;
