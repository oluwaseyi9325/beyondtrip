"use client";

import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  selectableRows?: boolean;
  highlightOnHover?: boolean;
  handleSelectedRows?: (rows: any) => void;
};

function Table<T>({
  columns,
  data,
  selectableRows = false,
  highlightOnHover = false,
  handleSelectedRows,
}: TableProps<T>) {
  const customStyles = {
    tableWrapper: {
      style: {
        paddingBottom: 2,
      },
    },
    headRow: {
      style: {
        backgroundColor: "#C5E4FF",
        fontWeight: 600,
        fontSize: "14px",
        color: "#000000",
      },
    },
    headCells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    rows: {
      style: {
        height: "56px",
        color:"#444444"
      },
    },
  };

  return (
    <div className="w-full overflow-x-auto">
      <DataTable
        columns={columns}
        data={data}
        selectableRows={selectableRows}
        onSelectedRowsChange={handleSelectedRows}
        highlightOnHover={highlightOnHover}
        customStyles={customStyles}
      />
    </div>
  );
}

export default Table;
