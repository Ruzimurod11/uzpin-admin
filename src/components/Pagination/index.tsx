import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
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
    <div className="my-4 flex items-center justify-end gap-2 pb-4 pr-4">
      {displayedPages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`rounded px-3 py-1 ${
              page === currentPage
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
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
  );
};

export default Pagination;
