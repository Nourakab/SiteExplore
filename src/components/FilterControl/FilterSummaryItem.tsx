import React from 'react';
import { GrFormTrash } from 'react-icons/gr';

interface FilterSummaryItemProps {
  label: string;
  onRemove: () => void;
}

const FilterSummaryItem = ({ label, onRemove }: FilterSummaryItemProps) => (
  <div className="filter-summary-item">
    {label}
    <GrFormTrash onClick={onRemove} className="trash-icon" />
  </div>
);

export default FilterSummaryItem;
