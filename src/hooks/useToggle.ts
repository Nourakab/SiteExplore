import { useState } from 'react';

function useToggle(initialValue: string | null = null) {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    initialValue,
  );

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return { expandedSection, toggleSection };
}

export default useToggle;
