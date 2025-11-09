
import { TableColumn } from "react-data-table-component";
import clsx from "clsx";
import { TMagazineRow } from "..";

interface Props {
  handleClick: (id: string) => void;
  total: number;
  handleClickView: (row: TMagazineRow) => void;
}

export const useMagazineColumns = ({
}: Props): TableColumn<TMagazineRow>[] => {
  // const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  return [
    {
      name: "Date",
      width: "120px",

      selector: (row) => row.date,
    },
    {
      name: "Edition",
      selector: (row) => row.edition,
    },
    {
      name: "Status",
      cell: (row) => (
        <div
          className={clsx(
            "border text-xs font-medium rounded-full  py-2 w-full max-w-[12rem] inline-flex items-center justify-center",
            row.status === "Picked" && "text-[#018844] border-[#018844]",
            row.status === "Returned" && "text-[#FFA500] border-[#FFA500]",
            row.status === "Not Picked" && "text-[#FF3B3B] border-[#FF3B3B]"
          )}
        >
          {row.status}
        </div>
      ),
    },
    {
      name: "Location",
      selector: (row) => row.location,
    },
  ];
};

export const MAGAZINE_MOCK: TMagazineRow[] = [
  { date: "02 June, 2025", edition: "March Edition", status: "Picked", location: "Ikeja-Lagos" },
  { date: "02 June, 2025", edition: "March Edition", status: "Returned", location: "Ikeja-Lagos" },
  { date: "02 June, 2025", edition: "March Edition", status: "Not Picked", location: "Ikeja-Lagos" },
  { date: "02 June, 2025", edition: "March Edition", status: "Picked", location: "Ikeja-Lagos" },
];

