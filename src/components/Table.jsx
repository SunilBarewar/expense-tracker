import React, { useMemo, useState } from "react";
import { useTable } from "react-table";

export default function Table({ columns, data, isLoading }) {
  const columnData = useMemo(() => columns, [columns]);
  const tableData = useMemo(() => data, [data]);
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columnData,
      data: tableData,
      manualPagination: true,
      defaultColumn,
    });

  if (isLoading) {
    return <img src="spinner.gif" width={60} height={60} />;
  }

  return (
    <table
      {...getTableProps()}
      className="border-zinc-200 w-full overflow-scroll"
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className="columns-heading"
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="text-sm md:text-base tracking-wide border-zinc-200"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        {...getTableBodyProps()}
        className="text-neutral-700 text-[12px] sm:text-[14px]"
      >
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="p-2 border-zinc-200 hover:bg-gray-200 transition duration-200 ease-in-out"
            >
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="p-2 border">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
