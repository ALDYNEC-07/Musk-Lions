
import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import { getItemUnitPrice } from '../../utils/price';
import './CartModal.css';

const CartModal = ({ isOpen, onClose }) => {
    const { items, totalCount, removeItem, clearCart, updateQuantity } = useCart();
    const { openOrderModal } = useOrder();
    const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleOrder = () => {
    handleClose();
    openOrderModal();
  };

  if (!isOpen && !isVisible) return null;

    const totalPrice = items && items.length > 0 
        ? items.reduce((sum, item) => {
        const price = getItemUnitPrice(item);
        return sum + (price * (item.quantity || 1));
        }, 0)
    : 0;

  return (
    <div className={`cart-modal-overlay ${isVisible ? 'show' : ''}`}>
        <div className="cart-modal">
        <div className="cart-header">
            <h3>Корзина ({totalCount})</h3>
            <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <p className="empty-cart">Корзина пуста</p>
          ) : (
            items.map((item, index) => (
        <div key={item.id} className="cart-item">
        <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>{item.price}</p>
        </div>
        
        <div className="quantity-controls">
                <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                    -
                </button>
                
                    <span className="quantity">{item.quantity}</span>
                
                <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                    +
                </button>
        </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Удалить
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="total-price">
              Итого: {totalPrice.toLocaleString()} ₽
            </div>
            <div className="cart-actions">
              <button className="clear-btn" onClick={clearCart}>
                Очистить корзину
              </button>
              <button className="order-btn" onClick={handleOrder}>
                Оформить заказ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
