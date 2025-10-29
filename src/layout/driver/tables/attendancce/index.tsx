import Table from "@/components/table";
import { attendanceColumns, attendanceData } from "./data";
import Pagination from "@/components/pagination";

export interface TAttendance {
  name: string;
  time: string;
  averageScore: string;
  date: string;
  status: string;
}

interface CourseTableProps {
  onViewCourse: (course: TAttendance) => void;
  onUploadMaterials: (course: TAttendance) => void;
}

const AttendanceTable = ({
  onViewCourse,
  onUploadMaterials,
}: CourseTableProps) => {
  // Pass both callbacks to the coursesColumns function
  const columns = attendanceColumns(onViewCourse, onUploadMaterials);

  return (
    <>
      <Table<TAttendance> columns={columns} data={attendanceData} />
      <Pagination currentPage={1} totalPages={1} onPageChange={() => null} />
    </>
  );
};

export default AttendanceTable;
