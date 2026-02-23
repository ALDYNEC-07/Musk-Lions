import { useState, useMemo } from 'react';
import { allProducts } from '../data/allProducts';

let globalOpenSearch = null;

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  globalOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    
    return allProducts.filter((product) => {
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

export const openSearchGlobal = () => {
  if (globalOpenSearch) {
    globalOpenSearch();
  }
};
