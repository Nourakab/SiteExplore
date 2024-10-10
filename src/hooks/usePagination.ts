import { useState } from 'react';

export function usePagination(initialPage = 1, limit = 10) {
  const [page, setPage] = useState(initialPage);
  const [itemsPerPage] = useState(limit);

  const paginatedData = (data: any[]) => {
    return data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return { page, itemsPerPage, paginatedData, handlePageChange };
}
