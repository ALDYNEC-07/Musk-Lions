
import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { getItemUnitPrice } from '../../utils/price';
import './CartModal.css';

const WHATSAPP_PHONE = process.env.REACT_APP_WHATSAPP_PHONE || '79292523737';

const CartModal = ({ isOpen, onClose }) => {
    const { items, totalCount, removeItem, clearCart, updateQuantity } = useCart();
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

  if (!isOpen && !isVisible) return null;

    const totalPrice = items && items.length > 0
    ? items.reduce((sum, item) => {
      const price = getItemUnitPrice(item);
      return sum + (price * (item.quantity || 1));
    }, 0)
    : 0;

  const formatPrice = (price) => `${price.toLocaleString('ru-RU')} ₽`;

  const getWhatsAppMessage = () => {
    const orderLines = items.map((item, itemIndex) => {
      const unitPrice = getItemUnitPrice(item);
      const quantity = item.quantity || 1;
      const itemTotal = unitPrice * quantity;
      return `${itemIndex + 1}. ${item.name} - ${quantity} шт. x ${formatPrice(unitPrice)} = ${formatPrice(itemTotal)}`;
    });

    return [
      'Здравствуйте! Хочу оформить заказ:',
      '',
      ...orderLines,
      '',
      `Итого: ${formatPrice(totalPrice)}`,
      '',
      'MuskLions'
    ].join('\n');
  };

  const handleOrder = () => {
    const message = getWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

    const openedWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!openedWindow) {
      window.location.href = whatsappUrl;
    }
    handleClose();
  };

  return (
    <div className={`cart-modal-overlay ${isVisible ? 'show' : ''}`}>
        <div className="cart-modal">
        <div className="cart-header">
            <h3>Корзина: {totalCount}</h3>
            <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <p className="empty-cart">Корзина пуста</p>
          ) : (
            items.map((item) => (
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
                Очистить
              </button>
              <button className="order-btn" onClick={handleOrder}>
                Заказать в WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
