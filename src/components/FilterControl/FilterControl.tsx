import React, { useState, useEffect } from 'react';
import { MdOutlineFilterAlt } from 'react-icons/md';
import { MdOutlineDateRange } from 'react-icons/md';
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
import { useFilters } from '../../hooks/useFilter';
import './FilterControl.css';

interface FilterControlProps {
  allTags: string[];
  allCountries: string[];
  allSites?: any[];
  loading?: boolean;
  onFilterChange: (filters: {
    startDate: string | null;
    endDate: string | null;
    tags: string[];
    types: string[];
    countries: string[];
  }) => void;
}

const FilterControl = ({
  allTags,
  allCountries,
  allSites = [], // Default to an empty array
  loading = false, // Default to false
  onFilterChange,
}: FilterControlProps) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
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
        {/* Date Section */}

        <FilterSection
          title={
            <span>
              <MdOutlineDateRange />
              Date
            </span>
          }
          expanded={expandedSection === 'date'}
          onToggle={() => toggleSection('date')}
          summaryItems={
            startDate && endDate ? [`${startDate} - ${endDate}`] : []
          }
          onRemoveSummaryItem={() => {
            setStartDate(null);
            setEndDate(null);
          }}
        >
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </FilterSection>

        {/* Tags Section */}
        <FilterSection
          title={
            <span>
              <FaTags />
              Tag
            </span>
          }
          expanded={expandedSection === 'tags'}
          onToggle={() => toggleSection('tags')}
          summaryItems={selectedTags}
          onRemoveSummaryItem={(tag) =>
            setSelectedTags(selectedTags.filter((t) => t !== tag))
          }
        >
          <TagFilter
            selectedTags={selectedTags}
            handleTagChange={(tag) =>
              handleSelectionChange(tag, setSelectedTags, selectedTags)
            }
          />
        </FilterSection>

        {/* Type Section */}
        <FilterSection
          title={
            <span>
              <IoMdBusiness />
              Type
            </span>
          }
          expanded={expandedSection === 'type'}
          onToggle={() => toggleSection('type')}
          summaryItems={selectedTypes}
          onRemoveSummaryItem={(type) =>
            setSelectedTypes(selectedTypes.filter((t) => t !== type))
          }
        >
          <TypeFilter
            selectedTypes={selectedTypes}
            handleTypeChange={(type) =>
              handleSelectionChange(type, setSelectedTypes, selectedTypes)
            }
          />
        </FilterSection>

        {/* Country Section */}
        <FilterSection
          title={
            <span>
              <TiWorldOutline />
              Country
            </span>
          }
          expanded={expandedSection === 'country'}
          onToggle={() => toggleSection('country')}
          summaryItems={selectedCountries}
          onRemoveSummaryItem={(country) =>
            setSelectedCountries(selectedCountries.filter((c) => c !== country))
          }
        >
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
        </FilterSection>

        <FilterButtons onCancel={resetFilters} onApply={handleFilterApply} />
      </Modal>
    </>
  );
};

export default FilterControl;
