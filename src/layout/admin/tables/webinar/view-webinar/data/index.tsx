
import { TableColumn } from "react-data-table-component";
import { TRegistered } from "..";
interface Props {
  total: number;
  handleClickView: (row: TRegistered) => void;
  handleAddToClass: (studentId: string) => void;
}

export const useRegisteredColumns = ({
}: Props): TableColumn<TRegistered>[] => {

  return [
    {
      name: "S/N",
      width: "5%",
      cell: (_, index: number) => `0${index + 1}`,
    },
    {
      name: "Name",
      width: "20%",
      selector: (row) => ` ${row.fullName}`,
    },

    {
      name: "Email",
      width: "16%",
      selector: (row) => ` ${row.email}`,
    },
    {
      name: "Phone Number",
      selector: (row) => ` ${row.phoneNumber}`,
    },
    {
      name: "Company",
      selector: (row) => ` ${row.companyName}`,
    },
    {
      name: "Joining As",
      selector: (row) => ` ${row.joiningAs}`,
    },
  ];
};