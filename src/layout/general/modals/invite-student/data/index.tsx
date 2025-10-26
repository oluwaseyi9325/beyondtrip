import { TableColumn } from "react-data-table-component";

interface Tadvertiser {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export const advertiserColumns: TableColumn<Tadvertiser>[] = [
  {
    name: "Name",
    selector: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    name: "Email",
    selector: (row) => row.emailAddress,
  },
];
