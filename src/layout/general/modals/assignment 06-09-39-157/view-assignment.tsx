// import Button from "@/components/button";
import Modal from "@/components/modal";

interface TModal {
    open: boolean;
    handleClose: () => void;
    submissionsData: any;
}

const ViewAssignment = ({ open, handleClose, submissionsData }: TModal) => {
    if (!submissionsData) return null;
    console.log("Submissions Data: ", submissionsData);

    // Format due date
    const formatDueDate = (dateString: string) => {
        if (!dateString || dateString === "0001-01-01T00:00:00") {
            return "No due date set";
        }
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Modal open={open} handleClose={handleClose} className="w-[600px] max-h-[90vh] overflow-y-auto">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            Assignment Details
                        </h2>
                        <p className="text-sm text-gray-500">
                            View assignment information
                        </p>
                    </div>
               
                </div>

                {/* Assignment Category Badge */}
                <div className="mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                        <div className="w-2 h-2 rounded-full mr-2 bg-blue-600"></div>
                        {submissionsData?.assignmentCategory || 'Assignment'}
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* Assignment Title & Description */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {submissionsData?.assignmentTitle}
                        </h3>
                        <div className="prose prose-sm max-w-none">
                            <p dangerouslySetInnerHTML={{ __html: submissionsData?.assignmentDescription }} className="text-gray-600 leading-relaxed whitespace-pre-wrap"/>
                               
                        </div>
                    </div>

                    {/* Assignment Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Created By</h4>
                            <p className="text-gray-600">{submissionsData?.createdBy}</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Category</h4>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                                {submissionsData?.assignmentCategory}
                            </span>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Due Date</h4>
                            <p className={`text-sm ${
                                submissionsData?.dueDate === "0001-01-01T00:00:00" 
                                    ? 'text-gray-500 italic' 
                                    : 'text-gray-700'
                            }`}>
                                {formatDueDate(submissionsData?.dueDate)}
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Re-submittable</h4>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                submissionsData?.reSubmittable 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'bg-red-100 text-red-600'
                            }`}>
                                {submissionsData?.reSubmittable ? 'Yes' : 'No'}
                            </span>
                        </div>
                    </div>

                    {/* Attachments Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
                        {submissionsData?.attachmentLinks ? (
                            <div className="space-y-2">
                                {Array.isArray(submissionsData.attachmentLinks) 
                                    ? submissionsData.attachmentLinks.map((link: string, index: number) => (
                                        <a 
                                            key={index}
                                            href={link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                            </svg>
                                            Attachment {index + 1}
                                        </a>
                                    ))
                                    : (
                                        <a 
                                            href={submissionsData.attachmentLinks} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                            </svg>
                                            View Attachment
                                        </a>
                                    )
                                }
                            </div>
                        ) : (
                            <p className="text-gray-500 italic text-sm">No attachments</p>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ViewAssignment;