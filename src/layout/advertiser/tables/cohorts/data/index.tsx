import { TableColumn } from "react-data-table-component";
import { TCohort } from "..";
import { AiOutlineMore } from "react-icons/ai";
import { transformDateString } from "../../../../../helpers/convert-data";

export const cohortColumns: TableColumn<TCohort>[] = [
  {
    name: "S/N",
    width: "5%",
    cell: (_, index: number) => index + 1,
  },
  {
    name: "Cohort Name",
    selector: (row) => row.note ?? "-",
  },
  {
    name: "Start Date",
    selector: (row) => transformDateString(row.startDate),
  },
  {
    name: "End Date",
    selector: (row) => transformDateString(row.endDate),
  },
  {
    name: "",
    width: "7%",
    cell: () => (
      <div className="cursor-pointer">
        <AiOutlineMore size={24} />
      </div>
    ),
  },
];
