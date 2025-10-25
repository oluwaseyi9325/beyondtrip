
import ChangePassword from "@/layout/general/modals/password/change-password"
import EditProfile from "@/layout/general/modals/profile/edit-profile"
import Container from "@/layout/student/container"
import { InfoRow } from "@/layout/tutor/security/info-row"
import { InfoSection } from "@/layout/tutor/security/info-section"
import useAuthStore from "@/store/useAuthStore"
import { useState } from "react"
// import EditProfile from "./EditProfile" // Adjust path as needed

const Security = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const handleEdit = (section: string) => {
        if (section === "personal") {
            setIsEditModalOpen(true);
        } else {
            console.log(`Edit ${section}`)
        }
    }

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    }

    const handleChangePassword = () => {
        // window.open("/reset-password", "_blank");
        setIsChangePasswordModalOpen(true);
    }

    // const { data, isLoading, refetch } = useGetStudentsProfile()
    // console.log("Profile Data:", data)

    const { profile } = useAuthStore();
    console.log("Profile:", profile);

    return (
        <>
            <Container active="Account">
                <section className="container py-6 h-full overflow-y-hidden">
                    <div className="w-full flex items-center justify-between p-4">
                        <p className="header">Profile</p>
                    </div>
                    <div className="flex items-center gap-5 px-4 mb-3">
                        {/* <Image alt="" height={200} width={200} className="w-[90px]" src={"/assets/png/student.png"} /> */}
                        <div>
                            <h4 className="text-[#171313] font-bold text-2xl">{profile?.firstName||""} {profile?.lastName||""}</h4>
                            {/* <h6 className="text-[#BDBDBD]">{profile?.classes[0]?.course?.courseName||""}</h6> */}
                        </div>
                    </div>
                    <div className="flex gap-4 px-4">
                        <div className="grid md:grid-cols-2 gap-6 w-full">
                            {/* Personal Information Section */}
                            <InfoSection title="Personal information" onEdit={() => handleEdit("personal")}>
                                <InfoRow label="Name" value={`${profile?.firstName|| ""} ${profile?.lastName|| ""} `} />
                                <InfoRow label="User name" value={profile?.middleName||"••••"}/>
                                <InfoRow label="Country" value={profile?.country||"••••"} />
                                <InfoRow label="State" value={profile?.state||"••••"} />
                                <InfoRow label="Gender" value={profile?.gender||"••••"} />
                            </InfoSection>

                            {/* Verified Information Section with Security inside */}
                            <div className="space-y-6">
                                <InfoSection title="Verified Information" onEdit={() => handleEdit("verified")}>
                                    <InfoRow label="Email Address" value={profile?.emailAddress||"••••"} />
                                    <InfoRow label="Contact" value={profile?.phoneNumber||"••••"} />
                                </InfoSection>

                                <InfoSection title="Security" editText="Change Password" onEdit={handleChangePassword}>
                                    <InfoRow label="Password" value="••••••••••••" />
                                </InfoSection>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>

            {/* Edit Profile Modal */}
            <EditProfile
                open={isEditModalOpen}
                handleClose={handleCloseModal}
                classId="" // Not needed for profile edit, but keeping for interface compatibility
                refetch={() => {
                    // Add any refetch logic here if needed
                    console.log("Profile updated, refetching data...");
                }}
            />

            <ChangePassword
                open={isChangePasswordModalOpen}
                handleClose={()=>setIsChangePasswordModalOpen(false)}
            />
        </>
    )
}

export default Security