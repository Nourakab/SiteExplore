import React, { useEffect, ReactNode } from 'react';

interface FilterSectionProps {
  title: string;
  icon?: ReactNode; // Assuming the icon is optional
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function FilterSection({
  title,
  icon,
  expanded,
  onToggle,
  children,
}: FilterSectionProps) {
  // Log the expanded state to check if it's toggling correctly
  useEffect(() => {}, [expanded, title]);

  return (
    <div className={`filter-section ${expanded ? 'expanded' : ''}`}>
      <div className="filter-header" onClick={onToggle}>
        <span>
          {icon} {title}
          <span className="arrow">{expanded ? '▲' : '▼'}</span>
        </span>
      </div>
      {expanded && <div className="filter-details">{children}</div>}
    </div>
  );
}

export default FilterSection;
