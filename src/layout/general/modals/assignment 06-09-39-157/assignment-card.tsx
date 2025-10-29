interface AssignmentCardProps {
    assignment: any;
    isSubmitted: boolean;
    onViewAssignment: (assignment: any) => void;
    onSubmitAssignment: (id: string) => void;
    status?: string;
}

const AssignmentCard = ({
    assignment,
    isSubmitted,
    onViewAssignment,
    onSubmitAssignment,
    status,
}: AssignmentCardProps) => {
    const formatDueDate = (dueDate: string) => {
        if (dueDate === "0001-01-01T00:00:00" || !dueDate) {
            return "No due date";
        }
        return new Date(dueDate).toLocaleDateString();
    };

    const handleButtonClick = () => {
        if (isSubmitted || status === "completed") {
            onViewAssignment(assignment);
        } else {
            onSubmitAssignment(assignment.id);
        }
    };

    const getStatusInfo = () => {
        if (status === "completed" || isSubmitted) {
            return {
                showStatus: true,
                statusText: "✓ Submitted",
                statusClass: "bg-green-50 border-green-200 text-green-700"
            };
        } else if (status === "pending") {
            return {
                showStatus: true,
                statusText: "⏳ Pending Submission",
                statusClass: "bg-yellow-50 border-yellow-200 text-yellow-700"
            };
        }
        return { showStatus: false };
    };

    const statusInfo = getStatusInfo();

    return (
        <div className="bg-white border border-slate-400 shadow-md hover:shadow-lg transition-shadow duration-200 rounded-xl flex flex-col justify-between h-full">
            <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {assignment.assignmentTitle}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {assignment.assignmentDescription}
                </p>

                <div className="flex justify-between mt-6 text-sm text-gray-600">
                    <div>
                        <p className="font-medium">Due Date</p>
                        <p>{formatDueDate(assignment.dueDate)}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-medium">Allocated Mark</p>
                        <p>{assignment.MaxGrade || "N/A"}</p>
                    </div>
                </div>
                
                {statusInfo.showStatus && (
                    <div className={`mt-4 p-2 border rounded-md ${statusInfo.statusClass}`}>
                        <p className="text-sm font-medium">{statusInfo.statusText}</p>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-400">
                <button
                    onClick={handleButtonClick}
                    className={`w-full py-2 px-4 rounded-md font-semibold transition-colors duration-200 ${
                        isSubmitted || status === "completed"
                            ? "bg-[#121363] text-white hover:bg-[#0f0f4d]"
                            : "bg-[#171313] text-white hover:bg-[#2c2c2c]"
                    }`}
                >
                    {(isSubmitted || status === "completed") ? "View Assignment" : "Submit Assignment"}
                </button>
            </div>
        </div>
    );
};

export default AssignmentCard;