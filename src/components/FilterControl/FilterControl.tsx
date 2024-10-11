import React, { useState, useEffect } from 'react';

import { MdOutlineFilterAlt, MdOutlineDateRange } from 'react-icons/md';
import { FaTags } from 'react-icons/fa';
import { IoMdBusiness } from 'react-icons/io';
import { TiWorldOutline } from 'react-icons/ti';
import Modal from '../Modal';
import FilterSection from './FilterSection';
import FilterButtons from './FilterButtons';
import DateFilter from './DateFilter';
import TagFilter from './TagFilter';
import TypeFilter from './TypeFilter';
import CountryFilter from './CountryFilter';
import {
  getActiveFilterCount,
  getTotalAppliedFilters,
} from '../../helpers/filterHelpers';
import { FilterControlProps } from '../../types/FilterControlTypes';
import { useFilters } from '../../hooks/useFilter';

import './FilterControl.css';

const FilterControl = ({
  allTags,
  allCountries,
  allSites = [], // Default to an empty array
  loading = false, // Default to false
  onFilterChange,
}: FilterControlProps) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultsCount, setResultsCount] = useState<number>(0);

  // Use the hook to manage filtering and return filtered results
  const { filters, setFilters, filteredSites } = useFilters(allSites, loading);

  // Update results count whenever filteredSites changes
  useEffect(() => {
    setResultsCount(filteredSites.length);
  }, [filteredSites]);

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedTags([]);
    setSelectedTypes([]);
    setSelectedCountries([]);
    setExpandedSection(null);
    setDateError(null);
    setFilters({
      startDate: null,
      endDate: null,
      tags: [],
      type: null,
      country: null,
    });
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFilterApply = () => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setDateError('End date should be greater than or equal to start date.');
      return; // Prevent applying filters
    }
    setDateError(null); // Clear any existing error
    setFilters({
      startDate,
      endDate,
      tags: selectedTags,
      type: selectedTypes[0] || null,
      country: selectedCountries[0] || null,
    });

    onFilterChange({
      startDate,
      endDate,
      tags: selectedTags,
      types: selectedTypes,
      countries: selectedCountries,
    });

    setIsModalOpen(false);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSelectionChange = (
    item: string,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    selectedList: string[],
  ) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const filterText = getTotalAppliedFilters({
    startDate,
    endDate,
    tags: selectedTags,
    types: selectedTypes,
    countries: selectedCountries,
  });

  const filterSections = [
    { key: 'date', title: 'Date', icon: <MdOutlineDateRange /> },
    { key: 'tags', title: 'Tag', icon: <FaTags /> },
    { key: 'type', title: 'Type', icon: <IoMdBusiness /> },
    { key: 'country', title: 'Country', icon: <TiWorldOutline /> },
  ];

  return (
    <>
      <button onClick={toggleModal} className="filter-toggle-button">
        <span className="filter-text">
          Filters
          {getActiveFilterCount({
            startDate,
            endDate,
            tags: selectedTags,
            types: selectedTypes,
            countries: selectedCountries,
          }) > 0 && (
            <>
              {' '}
              (
              {getActiveFilterCount({
                startDate,
                endDate,
                tags: selectedTags,
                types: selectedTypes,
                countries: selectedCountries,
              })}
              )
            </>
          )}
        </span>
        <MdOutlineFilterAlt />
      </button>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="filter-modal-header">
          <h3>Filters {filterText && <span>{filterText}</span>}</h3>
        </div>

        {filterSections.map((section) => (
          <FilterSection
            key={section.key}
            title={
              <span>
                {section.icon}
                {section.title}
              </span>
            }
            expanded={expandedSection === section.key}
            onToggle={() => toggleSection(section.key)}
            summaryItems={
              section.key === 'date'
                ? startDate && endDate
                  ? [`${startDate} - ${endDate}`]
                  : []
                : section.key === 'tags'
                ? selectedTags
                : section.key === 'type'
                ? selectedTypes
                : selectedCountries
            }
            onRemoveSummaryItem={(item) => {
              if (section.key === 'date') {
                setStartDate(null);
                setEndDate(null);
                setDateError(null); // Reset error on date clear
              } else if (section.key === 'tags') {
                setSelectedTags(selectedTags.filter((t) => t !== item));
              } else if (section.key === 'type') {
                setSelectedTypes(selectedTypes.filter((t) => t !== item));
              } else {
                setSelectedCountries(
                  selectedCountries.filter((c) => c !== item),
                );
              }
            }}
          >
            {section.key === 'date' ? (
              <>
                <DateFilter
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
                {dateError && (
                  <div
                    style={{
                      color: 'red',
                      marginTop: '8px',
                      fontSize: '0.9rem',
                    }}
                  >
                    {dateError}
                  </div>
                )}
              </>
            ) : section.key === 'tags' ? (
              <TagFilter
                selectedTags={selectedTags}
                handleTagChange={(tag) =>
                  handleSelectionChange(tag, setSelectedTags, selectedTags)
                }
              />
            ) : section.key === 'type' ? (
              <TypeFilter
                selectedTypes={selectedTypes}
                handleTypeChange={(type) =>
                  handleSelectionChange(type, setSelectedTypes, selectedTypes)
                }
              />
            ) : (
              <CountryFilter
                selectedCountries={selectedCountries}
                handleCountrySelect={(country) =>
                  handleSelectionChange(
                    country,
                    setSelectedCountries,
                    selectedCountries,
                  )
                }
                removeSelectedCountry={(country) =>
                  setSelectedCountries(
                    selectedCountries.filter((c) => c !== country),
                  )
                }
                allCountries={allCountries}
              />
            )}
          </FilterSection>
        ))}

        <FilterButtons onCancel={resetFilters} onApply={handleFilterApply} />
      </Modal>
    </>
  );
};

export default FilterControl;
