import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const getDisplayedPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 2) pages.push(1, "...");
      if (currentPage === 1) {
        pages.push(currentPage, currentPage + 1);
      } else if (currentPage === totalPages) {
        pages.push(currentPage - 1, currentPage);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
      if (currentPage < totalPages - 1) pages.push("...", totalPages);
    }

    return pages;
  };

  const displayedPages = getDisplayedPages();

  return (
    <div className="my-4 flex flex-wrap items-center justify-between gap-4 pb-4 pr-4">
      {/* 🧮 Page size select */}
      <div className="ml-6 flex items-center gap-2">
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:border-primary focus:ring-primary"
        >
          {[10, 20, 30, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* 🔢 Page buttons */}
      <div className="flex items-center gap-2">
        {displayedPages.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`rounded px-3 py-1 text-sm transition ${
                page === currentPage
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-3 py-1 text-gray-700">
              ...
            </span>
          ),
        )}
      </div>
    </div>
  );
};

export default Pagination;
