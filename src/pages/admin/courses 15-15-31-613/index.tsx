// import Button from "@/components/button";
// import Container from "@/layout/admin/container";
// import { useGetCourses } from "@/services/course.service";
// import { GoPlus } from "react-icons/go";
// import CourseTable from "@/layout/admin/tables/courses";
// import AddCourse from "@/layout/general/modals/course/add-course";
// import { useState } from "react";
// import Empty from "@/layout/admin/tables/courses/empty";
// import TableSkeleton from "@/components/skeleton";
// import Pagination from "@/components/pagination";

// const Courses = () => {
//   const [open, setOpen] = useState(false);
//   const [editData, setEditData] = useState<any>(null); // Changed to editData
//   const [page, setPage] = useState(1);
//   const {
//     data: courses,
//     isLoading,
//     refetch,
//   } = useGetCourses({
//     PageSize: 30,
//     Page: page,
//   });
//   const totalPages = courses?.totalPages || 0;
//   const handleEdit = () => {
//     setEditData(courses); // Changed to setEditData
//     console.log(courses, "edit data");
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditData(null); // Changed to setEditData
//   };

//   return (
//     <>
//       <AddCourse
//          open={open}
//          handleClose={handleClose}
//          refetch={refetch}
//          editData={editData} // Changed to editData
//       />

//       <Container active="Courses">
//         <section className="container py-6 h-full overflow-y-auto scrollbar-none">
//           <div className="w-full flex items-center justify-between p-4 p">
//             <p className="header">COURSES</p>

//             <Button
//               size="md"
//               className="max-w-[160px] text-white text-sm font-[600]"
//               hasIcon
//               icon={<GoPlus size={20} />}
//               handleClick={() => setOpen(true)}
//             >
//               Create Course
//             </Button>
//           </div>

//           {isLoading ? (
//             <TableSkeleton />
//           ) : !courses || courses?.length < 1 || courses?.totalCount < 1 ? (
//             <Empty handleClick={() => setOpen(true)} />
//           ) : (
//                 <>
//                   <CourseTable data={courses?.items} onEdit={handleEdit} />
//                   <Pagination
//               currentPage={page}
//               totalPages={totalPages}
//               onPageChange={setPage}
//             />
//                 </>
//           )}
//         </section>
//       </Container>
//     </>
//   );
// };

// export default Courses;


// import Table from "@/components/table";
import Button from "@/components/button";
import Container from "@/layout/admin/container";
import { useGetCourses } from "@/services/course.service";
import { GoPlus } from "react-icons/go";
import CourseTable from "@/layout/admin/tables/courses";
import AddCourse from "@/layout/general/modals/course/add-course";
import { useState } from "react";
import Empty from "@/layout/admin/tables/courses/empty";
import TableSkeleton from "@/components/skeleton";
import Pagination from "@/components/pagination";
import { TCourse } from "@/layout/admin/tables/courses"; // Import the type

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<TCourse | null>(null); // Better typing
  const [page, setPage] = useState(1);
  
  const {
    data: courses,
    isLoading,
    refetch,
  } = useGetCourses({
    PageSize: 30,
    Page: page,
  });
  
  const totalPages = courses?.totalPages || 0;
  
  // Fixed: This function now receives the individual course from the table
  const handleEdit = (course: TCourse) => {
    setEditData(course); // Set the specific course that was clicked
    console.log(course, "edit data"); // This will now log the correct course
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  return (
    <>
      <AddCourse
         open={open}
         handleClose={handleClose}
         refetch={refetch}
         editData={editData}
      />

      <Container active="Courses">
        <section className="container py-6 h-full overflow-y-auto scrollbar-none">
          <div className="w-full flex items-center justify-between p-4 p">
            <p className="header">COURSES</p>

            <Button
              size="md"
              className="max-w-[160px] text-white text-sm font-[600]"
              hasIcon
              icon={<GoPlus size={20} />}
              handleClick={() => setOpen(true)}
            >
              Create Course
            </Button>
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : !courses || courses?.length < 1 || courses?.totalCount < 1 ? (
            <Empty handleClick={() => setOpen(true)} />
          ) : (
                <>
                  <CourseTable data={courses?.items} onEdit={handleEdit} />
                  <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
                </>
          )}
        </section>
      </Container>
    </>
  );
};

export default Courses;