import React from 'react';

interface TagFilterProps {
  selectedTags: string[];
  handleTagChange: (tag: string) => void;
}

function TagFilter({ selectedTags, handleTagChange }: TagFilterProps) {
  const tags = ['Old', 'New', 'Renovated'];

  return (
    <>
      {tags.map((tag) => (
        <label key={tag}>
          <input
            type="checkbox"
            value={tag}
            checked={selectedTags.includes(tag)}
            onChange={() => handleTagChange(tag)}
          />
          {tag}
        </label>
      ))}
    </>
  );
}

export default TagFilter;
