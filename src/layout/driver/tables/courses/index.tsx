// import Table from "@/components/table";
// import { coursesColumns, courseData } from "./data";
// import Pagination from "@/components/pagination";

// export interface TCourses {
//   course_name: string;
//   course_code: string;
//   instructor: string;
//   date_created: string;
//   status: string;
// }

// interface CourseTableProps {
//   onViewCourse: (course: TCourses) => void;
// }

// const CourseTable = ({ onViewCourse }: CourseTableProps) => {
//   // Since coursesColumns is now a function, call it with the onViewCourse callback
//   const columns = coursesColumns(onViewCourse);

//   return (
//     <>
//       <Table<TCourses> columns={columns} data={courseData} />
//       <Pagination />
//     </>
//   );
// };

// export default CourseTable;

import Table from "@/components/table";
import { coursesColumns, courseData } from "./data";
import Pagination from "@/components/pagination";

export interface TCourses {
  course_name: string;
  course_code: string;
  instructor: string;
  date_created: string;
  status: string;
}

interface CourseTableProps {
  onViewCourse: (course: TCourses) => void;
  onUploadMaterials: (course: TCourses) => void;
}

const CourseTable = ({ onViewCourse, onUploadMaterials }: CourseTableProps) => {
  // Pass both callbacks to the coursesColumns function
  const columns = coursesColumns(onViewCourse, onUploadMaterials);

  return (
    <>
      <Table<TCourses> columns={columns} data={courseData} />
      <Pagination currentPage={1} totalPages={1} onPageChange={() => null} />
    </>
  );
};

export default CourseTable;
