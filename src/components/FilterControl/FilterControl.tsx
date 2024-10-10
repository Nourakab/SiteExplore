import React, { useState } from 'react';
import { MdOutlineFilterAlt } from 'react-icons/md';
import Modal from '../Modal';
import FilterSection from './FilterSection';
import FilterButtons from './FilterButtons';
import DateFilter from './DateFilter';
import TagFilter from './TagFilter';
import TypeFilter from './TypeFilter';
import CountryFilter from './CountryFilter';
import FilterSummaryItem from './FilterSummaryItem';
import './FilterControl.css';

interface FilterControlProps {
  allTags: string[];
  allCountries: string[];
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
  onFilterChange,
}: FilterControlProps) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<
    string | undefined
  >(undefined);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedTags([]);
    setSelectedTypes([]);
    setSelectedCountries([]);
    setValidationMessage(undefined);
    setExpandedSection(null);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFilterApply = () => {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      setValidationMessage('End Date should be later than Start Date.');
      return;
    }

    setValidationMessage(undefined);
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

  return (
    <>
      <button onClick={toggleModal} className="filter-toggle-button">
        Filters <MdOutlineFilterAlt />
      </button>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        {/* Active Filters Summary */}
        <div className="active-filters-summary">
          {startDate && endDate && (
            <FilterSummaryItem
              label={`Date: ${startDate} - ${endDate}`}
              onRemove={() => {
                setStartDate(null);
                setEndDate(null);
              }}
            />
          )}
          {selectedTags.map((tag) => (
            <FilterSummaryItem
              key={tag}
              label={`Tag: ${tag}`}
              onRemove={() =>
                setSelectedTags(selectedTags.filter((t) => t !== tag))
              }
            />
          ))}
          {selectedTypes.map((type) => (
            <FilterSummaryItem
              key={type}
              label={`Type: ${type}`}
              onRemove={() =>
                setSelectedTypes(selectedTypes.filter((t) => t !== type))
              }
            />
          ))}
          {selectedCountries.map((country) => (
            <FilterSummaryItem
              key={country}
              label={`Country: ${country}`}
              onRemove={() =>
                setSelectedCountries(
                  selectedCountries.filter((c) => c !== country),
                )
              }
            />
          ))}
        </div>

        {/* Filter Sections */}
        <FilterSection
          title="Date"
          expanded={expandedSection === 'date'}
          onToggle={() => toggleSection('date')}
        >
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            validationMessage={validationMessage}
          />
        </FilterSection>

        <FilterSection
          title="Tags"
          expanded={expandedSection === 'tags'}
          onToggle={() => toggleSection('tags')}
        >
          <TagFilter
            selectedTags={selectedTags}
            handleTagChange={(tag) =>
              handleSelectionChange(tag, setSelectedTags, selectedTags)
            }
          />
        </FilterSection>

        <FilterSection
          title="Type"
          expanded={expandedSection === 'type'}
          onToggle={() => toggleSection('type')}
        >
          <TypeFilter
            selectedTypes={selectedTypes}
            handleTypeChange={(type) =>
              handleSelectionChange(type, setSelectedTypes, selectedTypes)
            }
          />
        </FilterSection>

        <FilterSection
          title="Country"
          expanded={expandedSection === 'country'}
          onToggle={() => toggleSection('country')}
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
