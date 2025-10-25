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
        minHeight: "400px",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#F6F6F6",
        fontWeight: 500,
        fontSize: "12px",
        color: "#5E5E5E",
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
      },
    },
  };

  return (
    <div className="w-full  rounded-b-2xl min-h-[65vh]">
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
