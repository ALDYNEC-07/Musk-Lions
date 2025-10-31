import React, { createContext, useContext, useState, useMemo } from 'react';
import { allProducts } from '../data/allProducts'; // ✅ ЗАМЕНИЛ НА allProducts

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 🎯 ФИЛЬТРАЦИЯ ТОВАРОВ
  const filteredProducts = useMemo(() => {
    if (!isFilterApplied) {
      return allProducts; // ✅ ИСПОЛЬЗУЕМ allProducts
    }

    return allProducts.filter(product => { // ✅ ИСПОЛЬЗУЕМ allProducts
      const price = product.numericPrice;
      const min = minPrice === '' ? 0 : Number(minPrice);
      const max = maxPrice === '' ? Infinity : Number(maxPrice);
      
      return price >= min && price <= max;
    });
  }, [minPrice, maxPrice, isFilterApplied]);

  // 🎯 ПРИМЕНЕНИЕ ФИЛЬТРА + ПРОКРУТКА
  const applyFilter = () => {
    setIsFilterApplied(true);
    
    setTimeout(() => {
      const productsSection = document.querySelector('.mountain-collection');
      if (productsSection) {
        productsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  // 🎯 СБРОС ФИЛЬТРА
  const resetFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    setIsFilterApplied(false);
  };

  // 🎯 УПРАВЛЕНИЕ МОДАЛКОЙ
  const openFilter = () => {
    setIsFilterOpen(true);
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const isFilterActive = isFilterApplied;

  const value = {
    minPrice,
    setMinPrice,
    maxPrice, 
    setMaxPrice,
    filteredProducts,
    applyFilter,
    resetFilter,
    isFilterActive,
    totalProducts: allProducts.length, // ✅ ИСПОЛЬЗУЕМ allProducts
    isFilterApplied,
    isFilterOpen,
    openFilter,
    closeFilter,
    products: allProducts, // ✅ ИСПОЛЬЗУЕМ allProducts
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};