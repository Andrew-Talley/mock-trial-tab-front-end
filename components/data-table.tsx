import React from "react";
import { Column, useTable } from "react-table";
import { Table } from "reactstrap";

interface DataTableProps {
  data: any[];
  columns: Column[];
  noDataIndicator?: React.ReactNode;
}
export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  noDataIndicator,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: columns as Column<any>[],
    data: data || [],
  });

  return (
    <React.Fragment>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {data?.length === 0 && (noDataIndicator ?? <span>No data present</span>)}
    </React.Fragment>
  );
};
