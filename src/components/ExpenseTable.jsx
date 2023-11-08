import React, { useEffect, useState } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import { fetchExpenses } from "../api/ExpenseRequest";
import { expenseTableColumns } from "../constants/tableColumns";

const ExpenseTable = () => {
  const [pageData, setPageData] = useState({
    expenses: [],
    isLoading: false,
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  // fetching the expenses whenever current page changes
  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      expenses: [],
      isLoading: true,
    }));

    (async () => {
      const result = await fetchExpenses(currentPage);
      console.log(result.data);
      const { totalPages, expenses } = result.data;
      setPageData({
        isLoading: false,
        expenses: expenses,
        totalPages,
      });
    })();
  }, [currentPage]);
  return (
    <div className="w-full py-4 px-1 flex justify-center items-center flex-col">
      <h1 className="text-2xl lg:text-3xl font-mono font-bold border-b-2 px-5 py-1 mb-5 text-zinc-700 border-red-500">
        Expense list
      </h1>
      <div
        // style={{ minWidth: "480px", overflowX: "scroll", minHeight: "300px" }}
        className="w-[98%] md:w-[90%] lg:w-[70%] text-center shadow-md"
      >
        <Table
          columns={expenseTableColumns}
          data={pageData.expenses}
          isLoading={pageData.isLoading}
        />
      </div>

      {pageData.totalPages > 1 && (
        <Pagination
          totalPages={pageData.totalPages}
          pageChangeHandler={setCurrentPage}
          rowsPerPage={10}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default ExpenseTable;
