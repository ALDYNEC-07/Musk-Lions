// context/FilterContext.js
import React, { createContext, useContext, useState, useMemo } from 'react';
import { allProducts } from '../data/allProducts';
import { products } from '../data/products';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);


  // 🎯 ПРОСТАЯ ФУНКЦИЯ ФИЛЬТРАЦИИ
  const filterProducts = (productsArray) => {
    if (!isFilterApplied) {
      return productsArray;
    }

    return productsArray.filter(product => {
      const price = product.numericPrice;
      const min = minPrice === '' ? 0 : Number(minPrice);
      const max = maxPrice === '' ? Infinity : Number(maxPrice);
      
      if (minPrice && price < min) return false;
      if (maxPrice && price > max) return false;
      return true;
    });
  };

  // 🎯 ФИЛЬТРОВАННЫЕ ТОВАРЫ ДЛЯ КАЖДОЙ СТРАНИЦЫ
  const filteredProductsHome = useMemo(() => 
    filterProducts(products), [minPrice, maxPrice, isFilterApplied, products]
  );

  const filteredProductsCollection = useMemo(() => 
    filterProducts(allProducts), [minPrice, maxPrice, isFilterApplied, allProducts]
  );

  // 🎯 ПРИМЕНЕНИЕ ФИЛЬТРА
  const applyFilter = () => {
    setIsFilterApplied(true);
    setIsFilterOpen(false);
    
    setTimeout(() => {
      const productsSection = document.querySelector('.mountain-collection, .collection-page');
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

  // 🎯 ОТКРЫТИЕ ФИЛЬТРА
  const openFilter = () => {
    setIsFilterOpen(true);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const isFilterActive = isFilterApplied && (minPrice || maxPrice);

  const value = {
    // Цены
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    
    // Фильтрованные товары
    filteredProductsHome,
    filteredProductsCollection,
    
    // Действия
    applyFilter,
    resetFilter,
    isFilterActive,
    
    // Информация
    totalProductsHome: products.length,
    totalProductsCollection: allProducts.length,
    isFilterApplied,
    
    // Модальное окно
    isFilterOpen,
    openFilter,
    closeFilter,
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