import { TableColumn } from "react-data-table-component";
import { TPartner } from "..";
import { useRouter } from "next/navigation";
import { getDateOnly } from "@/utils/date-utils";

interface Props {
  handleClick: (id: string) => void;
  total: number;
}

export const usePartnerColumns = ({
  // handleClick,
  // total,
}: Props): TableColumn<TPartner>[] => {
  const navigation= useRouter()
  return [
    {
      name: "Name",
      width: "23%",
      selector: (row) => row.partnerName,
    },
    {
      name: "ID",
      width: "23%",
      selector: (row) => row.partnerCode,
    },
    {
      name: "Start Date",
      selector: (row) => getDateOnly(row.startDate, "readable"),
    },
    {
      name: "End Date",
      selector: (row) => getDateOnly(row.endDate, "readable"),
    },
    {
      name: "",
      width: "7%",
      cell: (row,) => {
        return (
            <div
              className="cursor-pointer text-[#131364] font-bold"
              onClick={()=> navigation.push(`/admin/website/partners/${row?.partnerCode}`)}
            >
              View
            </div>

        
        
        );
      },
    },
  ];
};
