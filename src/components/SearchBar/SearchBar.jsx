// components/SearchBar/SearchBar.jsx
import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchBar.css';
import { useSearch } from '../../hooks/useSearch';
import { useFilter } from '../../context/FilterContext';
import { products } from '../../data/products'; // ✅ ДЛЯ ПРОВЕРКИ НА ГЛАВНОЙ

const SearchBar = ({onResultClick}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    filteredProductsHome,
    filteredProductsCollection,
    isFilterActive,
    resetFilter,
  } = useFilter();
  
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

  const focusProductCard = (productId) => {
    const element = document.getElementById(`product-${productId}`);
    if (!element) {
      return false;
    }

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    element.classList.add('highlight-product');
    setTimeout(() => {
      element.classList.remove('highlight-product');
    }, 2000);

    return true;
  };

  const runAfterRender = (callback) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(callback);
    });
  };

  const handleResultClick = (product) => {
    if (onResultClick) {
      onResultClick();
    }
    
    closeSearch();

    const currentPath = location.pathname;
    const isOnHomePage = products.some((p) => p.id === product.id);
    const isCollectionPage = currentPath === '/collection';

    const visibleProducts =
      currentPath === '/' && isOnHomePage
        ? filteredProductsHome
        : filteredProductsCollection;
    const isHiddenByFilter =
      isFilterActive && !visibleProducts.some((item) => item.id === product.id);

    const openSelectedProduct = () => {
      if (currentPath === '/' && isOnHomePage) {
        if (!focusProductCard(product.id)) {
          navigate('/collection', {
            state: {
              scrollToProductId: product.id
            }
          });
        }
        return;
      }

      if (isCollectionPage && focusProductCard(product.id)) {
        return;
      }

      navigate('/collection', {
        state: {
          scrollToProductId: product.id
        }
      });
    };

    if (isHiddenByFilter) {
      resetFilter();
      runAfterRender(openSelectedProduct);
      return;
    }

    openSelectedProduct();
  };

  const clearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="search-container" ref={searchRef}>
      <button 
        className="search-toggle"
        onClick={handleSearchClick}
        aria-label="Поиск товаров"
      >
      </button>

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

        {isSearchOpen && searchQuery && (
          <div className="search-results">
            {hasResults ? (
              <>
                <div className="search-results-header">
                  <span className="results-count">Найдено ароматов: {searchResults.length}</span>
                </div>
                
                <div className="search-results-list">
                  {searchResults.map((product) => (
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
                <button 
                  className="browse-collection-btn" 
                  onClick={() => {
                    closeSearch();
                    navigate('/collection');
                  }}
                >
                  Смотреть коллекцию
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isSearchOpen && <div className="search-overlay" onClick={closeSearch} />}
    </div>
  );
};

export default SearchBar;
