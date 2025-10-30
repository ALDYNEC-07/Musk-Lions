import React, { useEffect, useRef } from 'react';
import { useOrder } from '../../context/OrderContext';
import './OrderModal.css';

const OrderModal = () => {
  const {
    isOrderModalOpen,
    closeOrderModal,
    currentStep,
    orderData,
    updateOrderData,
    nextStep,
    prevStep,
    submitOrder,
    isSubmitting,
    orderSuccess,
    orderError,
    items,
    totalCount
  } = useOrder();

  const modalRef = useRef();

  // Автоскролл при смене шага
  useEffect(() => {
    if (isOrderModalOpen && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [currentStep, isOrderModalOpen]);

  if (!isOrderModalOpen) return null;

  const calculateTotalPrice = () => {
    return items.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/\s/g, '')) || 0;
      return sum + (price * (item.quantity || 1));
    }, 0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="order-step">
            <div className="step-header">
              <div className="step-number">01</div>
              <h3>Ваши контакты</h3>
            </div>
            <div className="form-grid">
              <div className="input-group">
                <label>Ваше имя</label>
                <input
                  type="text"
                  value={orderData.contact.fullName}
                  onChange={(e) => updateOrderData('contact', 'fullName', e.target.value)}
                  className="modern-input"
                />
              </div>
              <div className="input-group">
                <label>Телефон</label>
                <input
                  type="tel"
                  value={orderData.contact.phone}
                  onChange={(e) => updateOrderData('contact', 'phone', e.target.value)}
                  className="modern-input"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="order-step">
            <div className="step-header">
              <div className="step-number">02</div>
              <h3>Способ получения</h3>
            </div>
            <div className="delivery-options">
              <div 
                className={`delivery-option ${orderData.delivery.method === 'courier' ? 'selected' : ''}`}
                onClick={() => updateOrderData('delivery', 'method', 'courier')}
              >
                <div className="option-icon">🚗</div>
                <div className="option-content">
                  <h4>Курьерская доставка</h4>
                  <p>Бесплатная доставка по городу</p>
                </div>
                <div className="option-check"></div>
              </div>
              
              <div 
                className={`delivery-option ${orderData.delivery.method === 'pickup' ? 'selected' : ''}`}
                onClick={() => updateOrderData('delivery', 'method', 'pickup')}
              >
                <div className="option-icon">🏪</div>
                <div className="option-content">
                  <h4>Самовывоз</h4>
                  <p>Заберите заказ в нашем магазине</p>
                </div>
                <div className="option-check"></div>
              </div>
            </div>

            {orderData.delivery.method === 'courier' && (
              <div className="address-form">
                <div className="input-group">
                  <label>Адрес доставки</label>
                  <input
                    type="text"
                    value={orderData.delivery.address}
                    onChange={(e) => updateOrderData('delivery', 'address', e.target.value)}
                    className="modern-input"
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label>Комментарий к заказу (необязательно)</label>
              <textarea
                value={orderData.delivery.comment}
                onChange={(e) => updateOrderData('delivery', 'comment', e.target.value)}
                className="modern-textarea"
                rows="3"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="order-step">
            <div className="step-header">
              <div className="step-number">03</div>
              <h3>Подтверждение заказа</h3>
            </div>
            
            <div className="order-review">
              <div className="review-section">
                <h4>Состав заказа</h4>
                <div className="products-minimal">
                  {items.map((item) => {
                    const itemTotal = parseInt(item.price.replace(/\s/g, '')) * item.quantity;
                    return (
                      <div key={item.id} className="product-minimal">
                        <div className="product-info">
                          <span className="product-name">{item.name}</span>
                          <span className="product-quantity">×{item.quantity}</span>
                        </div>
                        <span className="product-total">{itemTotal.toLocaleString()} ₽</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="review-details">
                <div className="detail-row">
                  <span>Контактные данные:</span>
                  <div className="detail-content">
                    <strong>{orderData.contact.fullName}</strong>
                    <span>{orderData.contact.phone}</span>
                  </div>
                </div>
                
                <div className="detail-row">
                  <span>Доставка:</span>
                  <div className="detail-content">
                    <strong>{orderData.delivery.method === 'courier' ? 'Курьером' : 'Самовывоз'}</strong>
                    {orderData.delivery.method === 'courier' && (
                      <>
                        <span>{orderData.delivery.city}</span>
                        <span>{orderData.delivery.address}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="order-total">
                <div className="total-line">
                  <span>Итого:</span>
                  <span className="total-price">{calculateTotalPrice().toLocaleString()} ₽</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modern-modal-overlay">
      <div className="modern-modal" ref={modalRef}>
        <div className="modal-header">
          <button className="modern-close" onClick={closeOrderModal}>
            <span>×</span>
          </button>
        </div>

        <div className="modal-content">
          <div className="modal-title">
            <h2>Оформление заказа</h2>
            <div className="step-indicator">
              <span className="current-step">Шаг {currentStep}</span>
              <span className="total-steps">из 3</span>
            </div>
          </div>

          <div className="steps-container">
            {renderStep()}
          </div>

          {orderError && (
            <div className="modern-error">
              <div className="error-icon">⚠️</div>
              <span>{orderError}</span>
            </div>
          )}

          {orderSuccess && (
            <div className="modern-success">
              <div className="success-icon">🎉</div>
              <div>
                <strong>Заказ успешно оформлен!</strong>
                <p>Скоро с вами свяжется наш менеджер</p>
              </div>
            </div>
          )}

          <div className="modern-actions">
            {currentStep > 1 && (
              <button className="modern-btn secondary" onClick={prevStep}>
                ← Назад
              </button>
            )}
            
            {currentStep < 3 ? (
              <button className="modern-btn primary" onClick={nextStep}>
                Продолжить →
              </button>
            ) : (
              <button 
                className="modern-btn submit" 
                onClick={submitOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Оформляем...
                  </>
                ) : (
                  'Подтвердить заказ'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;