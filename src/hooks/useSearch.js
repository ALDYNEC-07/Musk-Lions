import { useState, useMemo } from 'react';
import { products } from '../data/products';

// 🎯 ГЛОБАЛЬНАЯ ПЕРЕМЕННАЯ ДЛЯ УПРАВЛЕНИЯ ПОИСКОМ ИЗВНЕ
let globalOpenSearch = null;

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 🎯 РЕГИСТРИРУЕМ ФУНКЦИЮ ГЛОБАЛЬНО
  globalOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    
    return products.filter(product => {
      const searchString = `
        ${product.name.toLowerCase()}
        ${product.description.toLowerCase()}
        ${product.price.toLowerCase()}
      `;
      
      return searchString.includes(query);
    });
  }, [searchQuery]);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchOpen,
    openSearch,
    closeSearch,
    hasResults: searchResults.length > 0
  };
};

// 🎯 ЭКСПОРТИРУЕМ ГЛОБАЛЬНУЮ ФУНКЦИЮ
export const openSearchGlobal = () => {
  if (globalOpenSearch) {
    globalOpenSearch();
  }
};
