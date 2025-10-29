import Container from "@/layout/student/container";
import DocumentCard from "@/layout/student/material";
import useAuthStore from "@/store/useAuthStore";
// import { useGetMaterials } from "@/services/material.service";
export const documentsData = [
  {
    id: 1,
    title: "Introduction to Product Management",
    subtitle: "Material for Product Management",
    date: "Jul 13, 2023",
    type: "PDF",
    size: "2.4 MB",
  },
];

const Material = () => {


  const handleDownload = (doc: any) => {
    if (typeof window !== "undefined") {
      window.open(doc.fileUrl, "_blank");
    }
  };

  const { profile } = useAuthStore();
  const materialData= profile?.classes[0]?.courseMaterials




  return (
    <Container active="Material">
      <section className="container py-6 h-full overflow-y-auto scrollbar-none">
        <div className="w-full flex items-center justify-between p-4">
          <p className="header">MATERIALS</p>
        </div>

        <div className="p-3 space-y-3">
         
          {materialData?.map((document:any,i:any) => (
            <DocumentCard
              isDefaultStyle={true}
              key={i}
              document={document}
              onDownload={handleDownload}
            />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Material;
