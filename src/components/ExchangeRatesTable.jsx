import React, { useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { useExchangeRateContext } from "../context/ExchangeRatesProvider";
import Pagination from "./Pagination";
import CurrencySelector from "./CurrencySelector";

const ExchangeRatesTable = () => {
  const { exchangeRates } = useExchangeRateContext();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showCurrencyList, setShowCurrencyList] = useState(false);

  const currencies = ["USD", "GBP", "AUD"];

  const handleCurrencyClick = () => {
    setShowCurrencyList((prev) => !prev);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "date", header: "Date", cell: (info) => new Date(info.getValue()).toLocaleDateString("en-GB").replace(/\//g, ".") },
      { accessorKey: `eur_to_${selectedCurrency.toLowerCase()}`, header: `EUR ➜ ${selectedCurrency}` },
    ],
    [selectedCurrency]
  );

  const table = useReactTable({
    data: exchangeRates || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { sorting: [{ id: "date", desc: true }], pagination: { pageSize: 10 } },
  });

  const lastUpdated = exchangeRates.length > 0 ? new Date(exchangeRates[0].date).toLocaleDateString("en-GB").replace(/\//g, ".") : "N/A";

  const selectedCurrencyRateKey = `eur_to_${selectedCurrency.toLowerCase()}`;

  const validRates = exchangeRates
    .map(rate => parseFloat(rate[selectedCurrencyRateKey]))
    .filter(rate => !isNaN(rate));

  const minRate = useMemo(() => validRates.length ? Math.min(...validRates) : 0, [validRates]);
  const maxRate = useMemo(() => validRates.length ? Math.max(...validRates) : 0, [validRates]);
  const avgRate = useMemo(() => {
    if (validRates.length) {
      const total = validRates.reduce((sum, rate) => sum + rate, 0);
      return (total / validRates.length).toFixed(4);
    }
    return 0;
  }, [validRates]);

  return (
    <div className="page-container">
      <div className="table-container">
        <h2 className="table-title">
          <span>1 EUR to </span>
          <span className="currency" onClick={handleCurrencyClick}>
            {selectedCurrency}▾
          </span>
          <span> exchange rate</span>
          {showCurrencyList && (
            <CurrencySelector
              currencies={currencies}
              selectedCurrency={selectedCurrency}
              onCurrencySelect={handleCurrencySelect}
              setShowCurrencyList={setShowCurrencyList}
            />
          )}
        </h2>
        <p className="last-updated">Last updated: {lastUpdated}</p>
          
        <Pagination
          pageIndex={table.getState().pagination.pageIndex}
          pageCount={table.getPageCount()}
          pageOptions={table.getPageOptions()}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          gotoPage={table.setPageIndex}
          previousPage={table.previousPage}
          nextPage={table.nextPage}
        />
        <table className="table-wrapper">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "desc" ? " ▼" : header.column.getIsSorted() === "asc" ? " ▲" : ""}
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
        
        <Pagination
          pageIndex={table.getState().pagination.pageIndex}
          pageCount={table.getPageCount()}
          pageOptions={table.getPageOptions()}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          gotoPage={table.setPageIndex}
          previousPage={table.previousPage}
          nextPage={table.nextPage}
        />

        <div className="exchange-rate-summary">
          <p><b>Min. rate:</b> {minRate}</p>
          <p><b>Max. rate:</b> {maxRate}</p>
          <p><b>Average:</b> {avgRate}</p>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRatesTable;
