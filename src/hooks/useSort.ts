import { useState, useEffect } from 'react';

export function useSort<T>(
  items: T[],
  defaultField: string,
  defaultOrder: 'asc' | 'desc',
) {
  const [sortedItems, setSortedItems] = useState<T[]>([]);
  const [selectedField, setSelectedField] = useState(defaultField);
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultOrder);

  useEffect(() => {
    if (items.length === 0) return; // Skip if there are no items

    const sorted = [...items].sort((a, b) => {
      const aValue = a[selectedField as keyof T];
      const bValue = b[selectedField as keyof T];

      // Check if the field being sorted is a date
      const isDateField = selectedField.toLowerCase().includes('date');

      if (isDateField) {
        // If it's a date, convert to Date objects for comparison
        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);

        return order === 'asc'
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      } else {
        // Standard comparison for non-date fields (string or number)
        if (aValue < bValue) {
          return order === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return order === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });

    setSortedItems(sorted);
  }, [items, selectedField, order]);

  const handleSortChange = (field: string, newOrder: 'asc' | 'desc') => {
    setSelectedField(field);
    setOrder(newOrder);
  };

  return {
    sortedItems,
    selectedField,
    order,
    handleSortChange,
  };
}
