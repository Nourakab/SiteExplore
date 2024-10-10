import React from 'react';

interface TypeFilterProps {
  selectedTypes: string[];
  handleTypeChange: (type: string) => void;
}

function TypeFilter({ selectedTypes, handleTypeChange }: TypeFilterProps) {
  const types = ['individual', 'company', 'state'];

  return (
    <>
      {types.map((type) => (
        <label key={type}>
          <input
            type="checkbox"
            value={type}
            checked={selectedTypes.includes(type)}
            onChange={() => handleTypeChange(type)}
          />
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
      ))}
    </>
  );
}

export default TypeFilter;
