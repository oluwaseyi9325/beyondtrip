import Table from "@/components/table";
import { registeredColumns, registeredData } from "./data";
import { HiArrowRight } from "react-icons/hi2";

export interface TRegistered {
  name: string;
  email: string;
  course: string;
  cohort: string;
  date: string;
  status: string;
}

const RegisteredTable = () => {
  return (
    <section className="container">
      <div className="pt-6 pb-4 px-4">
        <p className="header">RECENTLY JOINED</p>
      </div>

      <Table<TRegistered> columns={registeredColumns} data={registeredData} />

      <div className="w-full flex items-center justify-center py-4 gap-2 cursor-pointer">
        <p className="text-[#7E7E7EEF] font-[500]">
          View all registered students
        </p>
        <HiArrowRight />
      </div>
    </section>
  );
};

export default RegisteredTable;
