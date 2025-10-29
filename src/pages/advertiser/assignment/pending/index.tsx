// 


import { useState } from "react";
import Container from "@/layout/student/container";
import useAuthStore from "@/store/useAuthStore";
import SubmitAssignment from "@/layout/general/modals/assignment/submit-assignment";
import ViewAssignment from "@/layout/general/modals/assignment/view-assignment";
import { useAssignmentData } from "@/layout/general/modals/assignment/useAssignmentData";
import AssignmentsList from "@/layout/general/modals/assignment/assignments-list";


const Courses = () => {
    // Modal states
    const [openViewAssignment, setOpenViewAssignment] = useState(false);
    const [openSubmitAssignment, setOpenSubmitAssignment] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
    const [assignmentId, setAssignmentId] = useState<string | null>(null);
    
    // Filter state for assignment status
    const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");

    const { profile } = useAuthStore();
    const classId = profile?.classes[0]?.id;
    
    const {
        assignments,
        isLoading,
        submissionsMap,
        refetch,
        refetchSubmissions
    } = useAssignmentData(classId);

    // Filter assignments based on status
    const getFilteredAssignments = () => {
        if (statusFilter === "pending") {
            return assignments.filter((assignment: any) => !submissionsMap[assignment.id]);
        } else if (statusFilter === "completed") {
            return assignments.filter((assignment: any) => submissionsMap[assignment.id]);
        }
        return assignments;
    };

    const filteredAssignments = getFilteredAssignments();

    const handleViewAssignment = (assignment: any) => {
        setSelectedAssignment(assignment);
        setOpenViewAssignment(true);
    };

    const handleSubmitAssignment = (id: string) => {
        setAssignmentId(id);
        setOpenSubmitAssignment(true);
    };

    const handleCloseViewAssignment = () => {
        setOpenViewAssignment(false);
        setSelectedAssignment(null);
    };

    const handleCloseSubmitAssignment = () => {
        setOpenSubmitAssignment(false);
        setAssignmentId(null);
    };

    return (
        <>
            <SubmitAssignment
                handleClose={handleCloseSubmitAssignment}
                open={openSubmitAssignment}
                classId={assignmentId as string}
                refetch={refetch}
                refetchSubmissions={refetchSubmissions}
            />
            
            <ViewAssignment
                handleClose={handleCloseViewAssignment}
                open={openViewAssignment}
                submissionsData={selectedAssignment}
            />

            <Container active="Attendance">
                <section className="container py-6 h-full overflow-y-hidden">
                    <div className="w-full flex items-center justify-between p-4 mb-4">
                        <p className="header">ASSIGNMENTS</p>
                        
                        {/* Status Filter Tabs */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setStatusFilter("all")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    statusFilter === "all"
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                All ({assignments.length})
                            </button>
                            <button
                                onClick={() => setStatusFilter("pending")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    statusFilter === "pending"
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                Pending ({assignments.filter((a: any) => !submissionsMap[a.id]).length})
                            </button>
                            <button
                                onClick={() => setStatusFilter("completed")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    statusFilter === "completed"
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                Completed ({assignments.filter((a: any) => submissionsMap[a.id]).length})
                            </button>
                        </div>
                    </div>

                    <AssignmentsList
                        assignments={filteredAssignments}
                        isLoading={isLoading}
                        submissionsMap={submissionsMap}
                        statusFilter={statusFilter}
                        onViewAssignment={handleViewAssignment}
                        onSubmitAssignment={handleSubmitAssignment}
                    />
                </section>
            </Container>
        </>
    );
};

export default Courses;