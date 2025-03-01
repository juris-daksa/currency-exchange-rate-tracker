import React from "react";
import { useExchangeRateContext } from "../context/ExchangeRatesProvider";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

const ExchangeRatesTable = () => {
  const { exchangeRates } = useExchangeRateContext();

  const columns = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "eur_to_usd", header: "EUR → USD" },
    { accessorKey: "eur_to_gbp", header: "EUR → GBP" },
    { accessorKey: "eur_to_aud", header: "EUR → AUD" },
  ];

  const table = useReactTable({
    data: exchangeRates || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table border="1" style={{ width: "100%", textAlign: "left" }}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExchangeRatesTable;
