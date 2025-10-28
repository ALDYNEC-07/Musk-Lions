import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFilter } from '../../context/FilterContext';
import './PriceFilterModal.css';

const PriceFilterModal = () => {
  const {
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    applyFilter,
    resetFilter,
    isFilterActive,
    isFilterOpen,
    closeFilter,
    products
  } = useFilter();

  const modalRef = useRef(null);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);
  
  const [activeInput, setActiveInput] = useState('min');

  // 🎯 РЕАЛЬНЫЙ ПОДСЧЕТ ТОВАРОВ ПРИ ИЗМЕНЕНИИ ЦЕН
  const currentProductCount = useMemo(() => {
    if (minPrice === '' && maxPrice === '') {
      return products.length; // Если поля пустые - все товары
    }
    
    const currentMin = minPrice === '' ? 0 : Number(minPrice);
    const currentMax = maxPrice === '' ? Infinity : Number(maxPrice);
    
    return products.filter(product => 
      product.numericPrice >= currentMin && 
      product.numericPrice <= currentMax
    ).length;
  }, [minPrice, maxPrice, products]); // 🎯 СЧЕТЧИК ОБНОВЛЯЕТСЯ ПРИ ИЗМЕНЕНИИ ЦЕН

  // 🎯 ЗАКРЫТИЕ ПРИ КЛИКЕ ВНЕ КОМПОНЕНТА
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeFilter();
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      
      setTimeout(() => {
        if (activeInput === 'min' && minInputRef.current) {
          minInputRef.current.focus();
        } else if (activeInput === 'max' && maxInputRef.current) {
          maxInputRef.current.focus();
        }
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen, closeFilter, activeInput]);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleMinFocus = () => {
    setActiveInput('min');
  };

  const handleMaxFocus = () => {
    setActiveInput('max');
  };

  const handleApplyFilter = () => {
    applyFilter();
    closeFilter();
  };

  const canApplyFilter = minPrice !== '' || maxPrice !== '';

  if (!isFilterOpen) return null;

  return (
    <div className="price-filter-overlay">
      <div className="price-filter-modal" ref={modalRef}>
        <div className="filter-modal-header">
          <h3>Фильтр по цене</h3>
          <button className="filter-close-btn" onClick={closeFilter}>
            ×
          </button>
        </div>

        <div className="filter-modal-content">
          <div className="price-inputs-modal">
            <div className="input-group-modal">
              <label>Минимальная цена</label>
              <div className="input-wrapper">
                <input
                  ref={minInputRef}
                  type="number"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  onFocus={handleMinFocus}
                  placeholder="0"
                  className="price-input-modal"
                />
                <span className="currency">₽</span>
              </div>
            </div>
            
            <div className="input-group-modal">
              <label>Максимальная цена</label>
              <div className="input-wrapper">
                <input
                  ref={maxInputRef}
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  onFocus={handleMaxFocus}
                  placeholder="20000"
                  className="price-input-modal"
                />
                <span className="currency">₽</span>
              </div>
            </div>
          </div>

          {/* 🎯 ИНФОРМАЦИЯ О НАЙДЕННЫХ ТОВАРАХ В РЕАЛЬНОМ ВРЕМЕНИ */}
          <div className="price-range-info">
            <span>Найдено: </span>
            <strong>
              {currentProductCount} из {products.length} товаров
            </strong>
          </div>
        </div>

        <div className="filter-modal-actions">
          <button 
            className="apply-filter-btn-modal" 
            onClick={handleApplyFilter}
            disabled={!canApplyFilter}
          >
            Применить фильтр
          </button>

          {isFilterActive && (
            <button className="reset-filter-btn-modal" onClick={resetFilter}>
              Сбросить фильтр
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceFilterModal;