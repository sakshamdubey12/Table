import React from 'react';

function Pagination({ itemsPerPage, totalItems, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle page change
  const handleClick = (pageNumber) => {
    const newPage = Math.min(Math.max(1, pageNumber), totalPages);
    setCurrentPage(newPage);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between">
      <div className="text-gray-500">
        {`${startItem}-${endItem} of ${totalItems}`}
      </div>
      <div className="inline-flex -space-x-px text-sm">
        <button
          onClick={() => handleClick(1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-2 h-8 text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
        >
          ≪
        </button>
        <button
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
        >
          &lt;
        </button>
        <button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
        >
          &gt;
        </button>
        <button
          onClick={() => handleClick(totalPages)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center px-2 h-8 text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
        >
          ≫
        </button>
      </div>
    </div>
  );
}

export default Pagination;
