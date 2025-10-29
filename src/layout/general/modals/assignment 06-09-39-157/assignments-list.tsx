// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import AssignmentCard from "./assignment-card";


// interface AssignmentsListProps {
//     assignments: any[];
//     isLoading: boolean;
//     submissionsMap: Record<string, boolean>;
//     onViewAssignment: (assignment: any) => void;
//     onSubmitAssignment: (id: string) => void;
//     status?: string;
// }

// const AssignmentsList = ({
//     assignments,
//     isLoading,
//     submissionsMap,
//     onViewAssignment,
//     onSubmitAssignment,
//     status,
// }: AssignmentsListProps) => {
//     if (isLoading) {
//         return (
//             <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {Array.from({ length: 6 }).map((_, index) => (
//                         <div
//                             key={index}
//                             className="w-full h-[200px] rounded-lg overflow-hidden bg-white p-4 shadow"
//                         >
//                             <Skeleton height={24} width="70%" />
//                             <Skeleton height={16} width="100%" className="mt-4" />
//                             <Skeleton height={16} width="90%" className="mt-2" />
//                             <div className="mt-6 flex justify-between">
//                                 <div>
//                                     <Skeleton height={14} width="60px" />
//                                     <Skeleton height={12} width="80px" className="mt-1" />
//                                 </div>
//                                 <div>
//                                     <Skeleton height={14} width="80px" />
//                                     <Skeleton height={12} width="40px" className="mt-1" />
//                                 </div>
//                             </div>
//                             <Skeleton height={36} width="100%" className="mt-4" />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     if (!assignments || assignments.length === 0) {
//         return (
//             <div className="p-6">
//                 <div className="w-full flex justify-center items-center py-16 text-center text-gray-500 font-medium">
//                     No assignments yet 😌
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {assignments.map((assignment: any) => (
//                     <AssignmentCard
//                         // isSumitted
//                         status={status}
//                         key={assignment.id}
//                         assignment={assignment}
//                         isSubmitted={submissionsMap[assignment.id]}
//                         onViewAssignment={onViewAssignment}
//                         onSubmitAssignment={onSubmitAssignment}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AssignmentsList;

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AssignmentCard from "./assignment-card";


interface AssignmentsListProps {
    assignments: any[];
    isLoading: boolean;
    submissionsMap: Record<string, boolean>;
    statusFilter: "all" | "pending" | "completed";
    onViewAssignment: (assignment: any) => void;
    onSubmitAssignment: (id: string) => void;
}

const AssignmentsList = ({
    assignments,
    isLoading,
    submissionsMap,
    statusFilter,
    onViewAssignment,
    onSubmitAssignment,
}: AssignmentsListProps) => {
    if (isLoading) {
        return (
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-full h-[200px] rounded-lg overflow-hidden bg-white p-4 shadow"
                        >
                            <Skeleton height={24} width="70%" />
                            <Skeleton height={16} width="100%" className="mt-4" />
                            <Skeleton height={16} width="90%" className="mt-2" />
                            <div className="mt-6 flex justify-between">
                                <div>
                                    <Skeleton height={14} width="60px" />
                                    <Skeleton height={12} width="80px" className="mt-1" />
                                </div>
                                <div>
                                    <Skeleton height={14} width="80px" />
                                    <Skeleton height={12} width="40px" className="mt-1" />
                                </div>
                            </div>
                            <Skeleton height={36} width="100%" className="mt-4" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!assignments || assignments.length === 0) {
        const getEmptyMessage = () => {
            switch (statusFilter) {
                case "pending":
                    return "No pending assignments 🎉";
                case "completed":
                    return "No completed assignments yet 📚";
                default:
                    return "No assignments yet 😌";
            }
        };

        return (
            <div className="p-6">
                <div className="w-full flex justify-center items-center py-16 text-center text-gray-500 font-medium">
                    {getEmptyMessage()}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignments.map((assignment: any) => {
                    const isSubmitted = submissionsMap[assignment.id];
                    const status = isSubmitted ? "completed" : "pending";
                    
                    return (
                        <AssignmentCard
                            key={assignment.id}
                            assignment={assignment}
                            isSubmitted={isSubmitted}
                            status={status}
                            onViewAssignment={onViewAssignment}
                            onSubmitAssignment={onSubmitAssignment}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AssignmentsList;