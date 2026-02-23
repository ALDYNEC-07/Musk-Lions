import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FilterProvider, useFilter } from './FilterContext';

const FilterHarness = () => {
  const {
    filteredProductsHome,
    filteredProductsCollection,
    totalProductsHome,
    totalProductsCollection,
    isFilterActive,
    isFilterOpen,
    setMinPrice,
    setMaxPrice,
    applyFilter,
    resetFilter,
    openFilter,
    closeFilter
  } = useFilter();

  return (
    <div>
      <div data-testid="home-count">{filteredProductsHome.length}</div>
      <div data-testid="collection-count">{filteredProductsCollection.length}</div>
      <div data-testid="home-total">{totalProductsHome}</div>
      <div data-testid="collection-total">{totalProductsCollection}</div>
      <div data-testid="filter-active">{String(Boolean(isFilterActive))}</div>
      <div data-testid="filter-open">{String(Boolean(isFilterOpen))}</div>

      <button type="button" onClick={() => setMinPrice('9000')}>
        set-min
      </button>
      <button type="button" onClick={() => setMaxPrice('11000')}>
        set-max
      </button>
      <button type="button" onClick={applyFilter}>
        apply
      </button>
      <button type="button" onClick={resetFilter}>
        reset
      </button>
      <button type="button" onClick={openFilter}>
        open
      </button>
      <button type="button" onClick={closeFilter}>
        close
      </button>
    </div>
  );
};

describe('FilterContext', () => {
  test('starts with full product lists', () => {
    render(
      <FilterProvider>
        <FilterHarness />
      </FilterProvider>
    );

    expect(screen.getByTestId('home-count')).toHaveTextContent('5');
    expect(screen.getByTestId('collection-count')).toHaveTextContent('10');
    expect(screen.getByTestId('home-total')).toHaveTextContent('5');
    expect(screen.getByTestId('collection-total')).toHaveTextContent('10');
    expect(screen.getByTestId('filter-active')).toHaveTextContent('false');
  });

  test('applies and resets price filter', () => {
    render(
      <FilterProvider>
        <FilterHarness />
      </FilterProvider>
    );

    fireEvent.click(screen.getByText('set-min'));
    fireEvent.click(screen.getByText('set-max'));
    fireEvent.click(screen.getByText('apply'));

    expect(screen.getByTestId('home-count')).toHaveTextContent('1');
    expect(screen.getByTestId('collection-count')).toHaveTextContent('4');
    expect(screen.getByTestId('filter-active')).toHaveTextContent('true');

    fireEvent.click(screen.getByText('reset'));

    expect(screen.getByTestId('home-count')).toHaveTextContent('5');
    expect(screen.getByTestId('collection-count')).toHaveTextContent('10');
    expect(screen.getByTestId('filter-active')).toHaveTextContent('false');
  });

  test('opens and closes filter modal state', () => {
    render(
      <FilterProvider>
        <FilterHarness />
      </FilterProvider>
    );

    fireEvent.click(screen.getByText('open'));
    expect(screen.getByTestId('filter-open')).toHaveTextContent('true');

    fireEvent.click(screen.getByText('close'));
    expect(screen.getByTestId('filter-open')).toHaveTextContent('false');
  });
});
