import React from 'react';

interface DateFilterProps {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  validationMessage?: string;
}

function DateFilter({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  validationMessage,
}: DateFilterProps) {
  return (
    <div>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate || ''}
          onChange={(e) => setStartDate(e.target.value || null)}
        />
      </label>
      <label style={{ marginLeft: '7px' }}>
        End Date:
        <input
          type="date"
          value={endDate || ''}
          onChange={(e) => setEndDate(e.target.value || null)}
        />
      </label>
      {validationMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>{validationMessage}</p>
      )}
    </div>
  );
}

export default DateFilter;
