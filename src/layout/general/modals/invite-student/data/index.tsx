import { TableColumn } from "react-data-table-component";

interface TStudent {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export const studentColumns: TableColumn<TStudent>[] = [
  {
    name: "Name",
    selector: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    name: "Email",
    selector: (row) => row.emailAddress,
  },
];
