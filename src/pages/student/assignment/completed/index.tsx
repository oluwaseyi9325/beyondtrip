import { useState } from "react";
import Container from "@/layout/student/container";
import useAuthStore from "@/store/useAuthStore";
import SubmitAssignment from "@/layout/general/modals/assignment/submit-assignment";
import ViewAssignment from "@/layout/general/modals/assignment/view-assignment";
import { useAssignmentData } from "@/layout/general/modals/assignment/useAssignmentData";
// import AssignmentsList from "@/layout/general/modals/assignment/assignments-list";


const Courses = () => {
    // Modal states
    const [openViewAssignment, setOpenViewAssignment] = useState(false);
    const [openSubmitAssignment, setOpenSubmitAssignment] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
    const [assignmentId, setAssignmentId] = useState<string | null>(null);

    const { profile } = useAuthStore();
    const classId = profile?.classes[0]?.id;
    
    const {
        assignments,
        isLoading,
        submissionsMap,
        refetch,
        refetchSubmissions
    } = useAssignmentData(classId);

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

            <Container active="Assignments">
                <section className="container py-6 h-full overflow-y-hidden">
                    <div className="w-full flex items-center justify-between p-4">
                        <p className="header">COMPLETED ASSIGNMENTS</p>
                    </div>

                    {/* <AssignmentsList
                        assignments={assignments}
                        isLoading={isLoading}
                        submissionsMap={submissionsMap}
                        onViewAssignment={handleViewAssignment}
                        onSubmitAssignment={handleSubmitAssignment}
                    /> */}
                </section>
            </Container>
        </>
    );
};

export default Courses;