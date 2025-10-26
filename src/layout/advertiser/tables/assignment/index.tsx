import Table from "@/components/table";
import { assignmentColumns, assignmentData } from "./data";
import Pagination from "@/components/pagination";


export interface TAssignment {
  assignment_detail: string;
  course: string;
  allocated_mark: string;
  due_date: string;
  status:string

}

interface AssignmentTableProps {
  onViewAssignment: (assignment: TAssignment) => void;
  onUploadAssignment: (assignment: TAssignment) => void;
}

const AssignmentTable = ({
  onViewAssignment,
  onUploadAssignment,
}: AssignmentTableProps) => {
  // Pass both callbacks to the coursesColumns function
  const columns = assignmentColumns(onViewAssignment, onUploadAssignment);

  return (
    <>
      <Table<TAssignment> columns={columns} data={assignmentData}  />
      <Pagination currentPage={1} totalPages={1} onPageChange={() => null} />
    </>
  );
};

export default AssignmentTable;
