import { useEffect, useState } from "react";
import { 
    fetchAssignmentSubmissions, 
    useGetAssignmentByCourseId 
} from "@/services/assignment.service";

export const useAssignmentData = (classId: string | undefined) => {
    const [submissionsMap, setSubmissionsMap] = useState<Record<string, boolean>>({});
    
    // API call
    const { data, isLoading, refetch } = useGetAssignmentByCourseId(classId as string);
    
    const assignments = data?.data?.items || [];

    const fetchAllSubmissions = async () => {
        if (!assignments.length) return;
        
        const map: Record<string, boolean> = {};

        await Promise.all(
            assignments.map(async (assignment: any) => {
                try {
                    const res = await fetchAssignmentSubmissions(assignment.id);
                    map[assignment.id] = res?.data?.length > 0;
                } catch (error) {
                    console.error(`Error fetching submissions for assignment ${assignment.id}:`, error);
                    map[assignment.id] = false;
                }
            })
        );

        setSubmissionsMap(map);
    };

    useEffect(() => {
        if (assignments?.length > 0) {
            fetchAllSubmissions();
        }
    }, [assignments]);

    return {
        assignments,
        isLoading: isLoading || !classId,
        submissionsMap,
        refetch,
        refetchSubmissions: fetchAllSubmissions,
    };
};