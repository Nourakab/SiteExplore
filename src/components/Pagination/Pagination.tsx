/*This component will receive the pagination links from the API (first, prev, next, last) 
and will display pagination buttons accordingly.*/
import React, { useState } from 'react';
import './Pagination.css';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  paginationLinks?: {
    first?: string;
    prev?: string;
    next?: string;
    last?: string;
  };
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  paginationLinks,
}: PaginationProps) => {
  const [dropdownPage, setDropdownPage] = useState(currentPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const siblingCount = 1;
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - siblingCount);
      const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

      pageNumbers.push(1);

      if (startPage > 2) {
        pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const handleDropdownChange = (newPage: number) => {
    onPageChange(newPage);
    setDropdownPage(newPage);
  };

  return (
    <div className="pagination-container">
      {/* First page button */}
      <button
        className="pagination-button"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        First
      </button>

      {/* Previous arrow */}
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdNavigateBefore />
      </button>

      {/* Render page numbers */}
      {pageNumbers.map((pageNumber, index) =>
        pageNumber === '...' ? (
          <div key={index} className="pagination-ellipsis">
            ...
            <div className="pagination-dropdown">
              <button
                className="pagination-arrow"
                onClick={() => setDropdownPage(dropdownPage - 1)}
                disabled={dropdownPage === 3}
              >
                <MdNavigateBefore />
              </button>
              {Array.from({ length: 10 }, (_, i) => {
                const page = dropdownPage + i;
                return page < totalPages ? (
                  <button
                    key={page}
                    onClick={() => handleDropdownChange(page)}
                    className={page === currentPage ? 'active' : ''}
                  >
                    {page}
                  </button>
                ) : null;
              })}
              <button
                className="pagination-arrow"
                onClick={() => setDropdownPage(dropdownPage + 1)}
                disabled={dropdownPage + 9 >= totalPages}
              >
                <MdNavigateNext />
              </button>
            </div>
          </div>
        ) : (
          <button
            key={index}
            className={`pagination-button ${
              pageNumber === currentPage ? 'active' : ''
            }`}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </button>
        ),
      )}

      {/* Next arrow */}
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdNavigateNext />
      </button>

      {/* Last page button */}
      <button
        className="pagination-button"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
