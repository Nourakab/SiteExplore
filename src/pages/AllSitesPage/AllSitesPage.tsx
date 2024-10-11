import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
import { usePagination } from '../../hooks/usePagination';
import { useFilters } from '../../hooks/useFilter';
import { useSort } from '../../hooks/useSort';
import ListView from '../../components/ListView';
import Pagination from '../../components/Pagination';
import FilterControl from '../../components/FilterControl';
import SortControl from '../../components/SortControl';
import { useExtractTags } from '../../hooks/useExtractTags';
import { useExtractCountries } from '../../hooks/useExtractCountries';
import '../../styles/BackButtonSharedStyles.css';
import './AllSitesPage.css';

const AllSitesPage = () => {
  const { page, itemsPerPage, paginatedData, handlePageChange } = usePagination(
    1,
    10,
  );
  const { sites, allSites, loading, error } = useFetchData(page, itemsPerPage);
  const { filters, setFilters, filteredSites } = useFilters(allSites, loading);
  const allTags = useExtractTags(allSites);
  const allCountries = useExtractCountries(allSites);
  const { sortedItems, selectedField, order, handleSortChange } = useSort(
    filteredSites,
    'title',
    'asc',
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && allSites.length > 0) {
      setFilters({ ...filters }); // Initialize with the current filters
    }
  }, [allSites, loading]); // Only listen for changes to allSites and loading

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="all-sites-page">
      <button onClick={() => navigate('/')} className="back-home-button">
        ← Back to Home
      </button>
      <h1>All Sites</h1>
      <div className="all-sites-container">
        <div className="filter-sort-header">
          <FilterControl
            allTags={allTags}
            allCountries={allCountries}
            onFilterChange={(filters) =>
              setFilters({
                startDate: filters.startDate,
                endDate: filters.endDate,
                tags: filters.tags,
                type: filters.types[0] || null, // Use first item or null
                country: filters.countries[0] || null,
              })
            }
          />

          <SortControl
            fields={[
              { label: 'Title', value: 'title' },
              { label: 'Created At', value: 'createdAt' },
              { label: 'Updated At', value: 'updatedAt' },
            ]}
            selectedField={selectedField}
            order={order}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="list-section">
          <ListView sites={paginatedData(sortedItems)} />
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(sortedItems.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AllSitesPage;
