import { useEffect, useState } from 'react';
import { Site } from '../types/Site';

// Hook to extract unique tags from the dataset

export const useExtractTags = (allSites: Site[]) => {
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    // Extract all tags from the sites array
    const tags = allSites.flatMap((site) => site.tags || []); //empty array as a fallback in case of undefined or null
    const uniqueTags = Array.from(new Set(tags)); // Remove duplicates
    setAllTags(uniqueTags); // Set the state with the unique tags
  }, [allSites]);

  return allTags; // Return the unique tags so they can be used in the component
};
