// hooks/useSearch.js - ИСПРАВЛЕННАЯ ВЕРСИЯ
import { useState, useMemo } from 'react';
import { allProducts } from '../data/allProducts'; // ✅ ЗАМЕНИЛ НА allProducts

// 🎯 ГЛОБАЛЬНАЯ ПЕРЕМЕННАЯ ДЛЯ УПРАВЛЕНИЯ ПОИСКОМ ИЗВНЕ
let globalOpenSearch = null;
let globalCloseMenu = null;

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 🎯 РЕГИСТРИРУЕМ ФУНКЦИЮ ГЛОБАЛЬНО
  globalOpenSearch = () => {
    setIsSearchOpen(true);
  };

  // РЕГИСТРИРУЕМ ФУНКЦИЮ ДЛЯ ЗАКРЫТИЯ МЕНЮ
    globalCloseMenu = () => {
    // Будет установлено извне
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    
    return allProducts.filter(product => { // ✅ ИСПОЛЬЗУЕМ allProducts
      const searchString = `
        ${product.name.toLowerCase()}
        ${product.description.toLowerCase()}
        ${product.price.toLowerCase()}
      `;
      
      return searchString.includes(query);
    });
  }, [searchQuery]);

    const openSearch = () => {
      setIsSearchOpen(true);
      if (globalCloseMenu) {
        globalCloseMenu(); // Закрываем меню при открытии поиска
      }
    };

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

// 🎯 ЭКСПОРТИРУЕМ ФУНКЦИЮ ДЛЯ РЕГИСТРАЦИИ CLOSE_MENU
export const setGlobalCloseMenu = (closeMenuFunc) => {
  globalCloseMenu = closeMenuFunc;
};