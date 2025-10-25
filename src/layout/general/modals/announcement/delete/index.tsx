import Button from "@/components/button";
import Modal from "@/components/modal";
import { TCourses } from "@/layout/tutor/tables/courses";

interface TModal {
    open: boolean;
    handleClose: () => void;
    courseData: TCourses | null;
}

const DeleteAnnouncement = ({ open, handleClose, courseData }: TModal) => {
    if (!courseData) return null;

    return (
        <Modal open={open} handleClose={handleClose} className="w-[490px] p-14">
            <div className="w-full flex flex-col gap-10">
                <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
                    Course Management
                </p>

                <section className="max-h-[65vh] w-full flex flex-col gap-4 overflow-y-auto scrollbar-none">
                    

                    

                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                        <p className="text-gray-600">
                            The company app is a great resource for getting help with your work or technical issues. 
                            You can submit a ticket to the support team, or you can search for help articles or videos.
                        </p>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <p className="font-semibold text-gray-800">Instructor</p>
                            <p className="text-gray-600">{courseData.instructor}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">Status</p>
                            <p className={`font-medium ${
                                courseData.status === 'Active' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {courseData.status}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <p className="font-semibold text-gray-800">Registered Students</p>
                            <p className="text-gray-600">25</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">Date Created</p>
                            <p className="text-gray-600">{courseData.date_created}</p>
                        </div>
                    </div>
                </section>

                <Button type="button" className="w-full text-[#FF0000] bg-[#FFE4E4] font-[700]">
                    {false ? "Deactivating..." : "Deactivate Course"}
                </Button>
                <Button type="button" className="w-full text-[#FF0000] bg-[#FFE4E4] font-[700]">
                    {false ? "Deactivating..." : "Deactivate Course"}
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteAnnouncement