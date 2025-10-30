import React, { useRef, useEffect } from 'react';
import './SearchBar.css';
import { useSearch } from '../../hooks/useSearch';


const SearchBar = ({onResultClick}) => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchOpen,
    openSearch,
    closeSearch,
    hasResults
  } = useSearch();

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, closeSearch]);

  const handleSearchClick = () => {
    if (!isSearchOpen) {
      openSearch();
    }
  };


  const handleResultClick = (product) => {
  // Закрываем меню (если в мобильной версии)
  if (onResultClick) {
    onResultClick(); // Это setIsMenuOpen(false)
  }
  
  // Закрываем поиск
  closeSearch();
  
  // Даем время на закрытие меню перед прокруткой
  setTimeout(() => {
    const element = document.getElementById(`product-${product.id}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
      
      element.classList.add('highlight-product');
      setTimeout(() => {
        element.classList.remove('highlight-product');
      }, 2000);
    }
  }, 300); // Ждем закрытия меню
};


  const clearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="search-container" ref={searchRef}>
      {/* Кнопка поиска */}
      <button 
        className="search-toggle"
        onClick={handleSearchClick}
        aria-label="Поиск товаров"
      >
      </button>

      {/* Поле поиска */}
      <div className={`search-field ${isSearchOpen ? 'active' : ''}`}>
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="Найти аромат по названию или описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          
          {searchQuery && (
            <button 
              className="search-clear"
              onClick={clearSearch}
              aria-label="Очистить поиск"
            >
              ×
            </button>
          )}
        </div>

        {/* Результаты поиска */}
        {isSearchOpen && searchQuery && (
          <div className="search-results">
            {hasResults ? (
              <>
                <div className="search-results-header">
                  <span className="results-count">Найдено ароматов: {searchResults.length}</span>
                  <div className="search-hint">
                    🔍 Используйте ↑↓ для навигации
                  </div>
                </div>
                
                <div className="search-results-list">
                  {searchResults.map((product, index) => (
                    <div
                      key={product.id}
                      className="search-result-item"
                      onClick={() => handleResultClick(product)}
                    >
                      <div className="product-card">
                        <div className="product-image-container">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="product-image"
                          />
                          <div className="product-overlay">
                            <span className="view-product">Посмотреть</span>
                          </div>
                        </div>
                        
                        <div className="product-content">
                          <div className="product-header">
                            <h4 className="product-name">{product.name}</h4>
                            <span className="product-price">{product.price}</span>
                          </div>
                          
                          <p className="product-description">
                            {product.description}
                          </p>
                          
                          <div className="product-meta">
                            <div className="product-rating">
                              <span className="rating-stars">★★★★★</span>
                              <span className="rating-text">Премиум</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="search-no-results">
                <div className="no-results-illustration">
                  <div className="perfume-bottle">🧴</div>
                  <div className="search-waves">🌊🌀</div>
                </div>
                <h4>Аромат не найден</h4>
                <p>Попробуйте изменить запрос или посмотрите всю коллекцию</p>
                <button className="browse-collection-btn" onClick={closeSearch}>
                  Смотреть коллекцию
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Overlay для мобильных */}
      {isSearchOpen && <div className="search-overlay" onClick={closeSearch} />}
    </div>
  );
};

export default SearchBar;