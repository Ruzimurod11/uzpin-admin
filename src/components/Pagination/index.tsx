import React from "react";

interface PaginationProps {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  page,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= count) {
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(count, page + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 rounded border px-3 py-1 ${
            i === page ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  return (
    <div className="mt-4 flex items-center justify-center">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`mx-1 rounded border px-3 py-1 ${
          page === 1 ? "cursor-not-allowed bg-gray-300" : "bg-white text-black"
        }`}
      >
        Prev
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === count}
        className={`mx-1 rounded border px-3 py-1 ${
          page === count
            ? "cursor-not-allowed bg-gray-300"
            : "bg-white text-black"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
