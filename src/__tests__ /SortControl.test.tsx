import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortControl from '../components/SortControl/SortControl';

describe('SortControl', () => {
  const fields = [
    { label: 'Title', value: 'title' },
    { label: 'Created At', value: 'createdAt' },
    { label: 'Updated At', value: 'updatedAt' },
  ];

  const onSortChange = jest.fn();

  test('renders SortControl component with fields', () => {
    render(
      <SortControl
        fields={fields}
        selectedField="title"
        order="asc"
        onSortChange={onSortChange}
      />,
    );

    const sortButton = screen.getByText(/Sort by: Title/i);
    expect(sortButton).toBeInTheDocument();

    const orderToggle = screen.getByRole('button', { name: '' }); // Selecting the button without text
    expect(orderToggle).toBeInTheDocument();
  });

  test('toggles sorting order when order button is clicked', () => {
    const { container } = render(
      <SortControl
        fields={fields}
        selectedField="title"
        order="asc"
        onSortChange={onSortChange}
      />,
    );

    const orderToggle = container.querySelector('.order-toggle');
    if (orderToggle) {
      fireEvent.click(orderToggle);
      expect(onSortChange).toHaveBeenCalledWith('title', 'desc');
    } else {
      throw new Error('Order toggle button not found');
    }
  });

  test('calls onSortChange when a different field is selected', () => {
    render(
      <SortControl
        fields={fields}
        selectedField="title"
        order="asc"
        onSortChange={onSortChange}
      />,
    );

    const sortButton = screen.getByText(/Sort by: Title/i);
    fireEvent.click(sortButton);

    const createdAtOption = screen.getByText(/Created At/i);
    fireEvent.click(createdAtOption);

    expect(onSortChange).toHaveBeenCalledWith('createdAt', 'asc');
  });
});
