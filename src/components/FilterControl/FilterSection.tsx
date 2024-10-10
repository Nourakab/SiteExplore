import React, { ReactNode } from 'react';
import FilterSummaryItem from './FilterSummaryItem';

interface FilterSectionProps {
  title: ReactNode;
  icon?: ReactNode;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  summaryItems?: string[];
  onRemoveSummaryItem?: (item: string) => void;
}

function FilterSection({
  title,
  icon,
  expanded,
  onToggle,
  children,
  summaryItems = [],
  onRemoveSummaryItem,
}: FilterSectionProps) {
  return (
    <div className={`filter-section ${expanded ? 'expanded' : ''}`}>
      <div className="filter-header" onClick={onToggle}>
        <span>
          {icon} {title}
          <span className="arrow">{expanded ? '▲' : '▼'}</span>
        </span>
      </div>

      {/* Display summary items only if section is collapsed and has selections */}
      {!expanded && summaryItems.length > 0 && (
        <div className="summary-group">
          {summaryItems.map((item) => (
            <FilterSummaryItem
              key={item}
              label={item}
              onRemove={() => onRemoveSummaryItem && onRemoveSummaryItem(item)}
            />
          ))}
        </div>
      )}

      {expanded && <div className="filter-details">{children}</div>}
    </div>
  );
}

export default FilterSection;
