// components/PriceFilterModal/PriceFilterModal.jsx
import React, { useMemo } from 'react';
import { useFilter } from '../../context/FilterContext';
import { allProducts } from '../../data/allProducts';
import { products } from '../../data/products';
import './PriceFilterModal.css';

const PriceFilterModal = () => {
  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    applyFilter,
    resetFilter,
    isFilterApplied,
    isFilterOpen,
    closeFilter,
    totalProductsHome,
    totalProductsCollection
  } = useFilter();

  // 🎯 ФУНКЦИЯ ДЛЯ ПРЕДВАРИТЕЛЬНОЙ ФИЛЬТРАЦИИ В РЕАЛЬНОМ ВРЕМЕНИ
  const filterProductsInRealTime = (productsArray) => {
    if (!minPrice && !maxPrice) {
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

  // 🎯 РЕАЛЬНОЕ ВРЕМЯ - ВЫЧИСЛЯЕМ РЕЗУЛЬТАТЫ СЕЙЧАС (ВСЕГДА ВЫЗЫВАЕТСЯ)
  const currentProductsInfo = useMemo(() => {
    const path = window.location.pathname;
    const productsArray = path === '/' ? products : allProducts;
    const totalProducts = path === '/' ? totalProductsHome : totalProductsCollection;
    
    const filteredProducts = filterProductsInRealTime(productsArray);
    const hasActiveFilter = !!(minPrice || maxPrice);
    
    return {
      total: totalProducts,
      filtered: filteredProducts.length,
      hasActiveFilter: hasActiveFilter,
      willShowResults: hasActiveFilter ? filteredProducts.length : totalProducts
    };
  }, [minPrice, maxPrice, totalProductsHome, totalProductsCollection]);

  if (!isFilterOpen) return null;

  const handleApply = () => {
    applyFilter();
  };

  const handleReset = () => {
    resetFilter();
  };

  const isApplyDisabled = minPrice && maxPrice && Number(minPrice) > Number(maxPrice);

  return (
    <div className="price-filter-modal-overlay" onClick={closeFilter}>
      <div className="price-filter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="filter-modal-header">
          <h3>Фильтр по цене</h3>
          <button className="filter-close-btn" onClick={closeFilter}>×</button>
        </div>

        <div className="filter-content">
          <div className="price-inputs">
            <div className="price-input-group">
              <label>Минимальная цена</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min="0"
                  className="price-input-modal"
                />
                <span className="currency">₽</span>
              </div>
            </div>
            
            <div className="price-input-group">
              <label>Максимальная цена</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  placeholder="20000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                  className="price-input-modal"
                />
                <span className="currency">₽</span>
              </div>
            </div>
          </div>

          <div className="filter-info">
            {/* 🎯 ПОКАЗЫВАЕМ РЕЗУЛЬТАТ В РЕАЛЬНОМ ВРЕМЕНИ */}
            {currentProductsInfo.hasActiveFilter ? (
              <p>
                Найдено: <strong>{currentProductsInfo.filtered} из {currentProductsInfo.total}</strong> ароматов
              </p>
            ) : (
              <p>
                Всего ароматов: <strong>{currentProductsInfo.total}</strong>
              </p>
            )}

            {/* 🎯 ПОДСКАЗКА О ТОМ ЧТО ЭТО ПРЕДПРОСМОТР */}
            {currentProductsInfo.hasActiveFilter && (
              <p style={{fontSize: '0.8rem', color: '#666', marginTop: '8px'}}>
                🔍 Предварительный просмотр
              </p>
            )}
          </div>
        </div>

        <div className="filter-actions">
          <button 
            className="filter-apply-btn"
            onClick={handleApply}
            disabled={isApplyDisabled}
          >
            Применить фильтр
          </button>
          <button 
            className="filter-reset-btn"
            onClick={handleReset}
          >
            Сбросить фильтр
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceFilterModal;