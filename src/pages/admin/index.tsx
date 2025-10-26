import Container from "@/layout/admin/container";


const Dashboard = () => {


  return (
    <>
    
      <Container>
        <section className="w-full px-4 py-6 flex flex-col gap-8 container">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="lg:text-2xl text-xl font-[800] leading-[26px] text-[#171313]">
                Good Morning, <span className="text-[#D0D0D0]">Admin!</span>
              </h1>
              <p className="font-[500] lg:text-xl text-md leading-none -tracking-[0.03em] text-[#5E5E5EEF]">
                Let’s tour around 😎
              </p>
            </div>

           
          </div>

         
        </section>

       
      </Container>
    </>
  );
};

export default Dashboard;
