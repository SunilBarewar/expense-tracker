import React from "react";

const Pagination = ({
  pageChangeHandler,
  totalPages,
  rowsPerPage,
  currentPage,
}) => {
  const nextPage = () => {
    pageChangeHandler(currentPage + 1);
  };

  const previousPage = () => {
    pageChangeHandler(currentPage - 1);
  };

  return (
    <div className="w-full p-2 mt-1">
      <div className="w-[50%] mx-auto flex justify-between items-center gap-2">
        <button
          disabled={currentPage === 1}
          className={`py-1 px-5 text-xl border border-slate-400 rounded-md ${
            currentPage === 1 && "bg-gray-200"
          }`}
          onClick={previousPage}
        >
          &lt;
        </button>
        <span className="px-4 py-1 text-slate-800 border border-blue-300 rounded">
          {currentPage}&nbsp;/&nbsp;{totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          className={`py-1 px-5 text-xl border border-slate-400 rounded-md ${
            currentPage === totalPages && "bg-gray-200"
          }`}
          onClick={nextPage}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
