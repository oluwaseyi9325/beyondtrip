import Table from "@/components/table";
import { studentColumns, studentData } from "./data";
import Pagination from "@/components/pagination";

export interface TStudent {
  student_name: string;
  program: string;
  gender: string;
  cohort: string;
  payment_status: string;
  joined_date: string;
  status: string;
}

interface CourseTableProps {
  onViewCourse: (course: TStudent) => void;
  onUploadMaterials: (course: TStudent) => void;
}

const StudentTable = ({
  onViewCourse,
  onUploadMaterials,
}: CourseTableProps) => {
  const columns = studentColumns(onViewCourse, onUploadMaterials);

  return (
    <>
      <Table<TStudent> columns={columns} data={studentData} />
      <Pagination currentPage={1} totalPages={1} onPageChange={() => null} />
    </>
  );
};

export default StudentTable;
