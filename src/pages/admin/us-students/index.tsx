import Container from "@/layout/admin/container";
import UsStudentsTable from "@/layout/admin/tables/us-studentTable";


const Registered = () => {
  return (
    <Container active="Students">
    

      <UsStudentsTable/>
    </Container>
  );
};

export default Registered;
