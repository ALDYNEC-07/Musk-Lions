import React, { createContext, useContext, useState, useCallback } from 'react';
import { useCart } from './CartContext';
import { getItemUnitPrice } from '../utils/price';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { items, clearCart } = useCart();
  
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    contact: {
      fullName: '',
      phone: '', 
    },
    delivery: {
      method: 'courier',
      address: '',
      comment: '',
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');

  // 🔧 ПРОСТАЯ И БЕЗОПАСНАЯ МАСКА ДЛЯ ТЕЛЕФОНА
  const formatPhone = (value) => {
    // Удаляем все нецифровые символы
    const numbers = value.replace(/\D/g, '');
    
    // Ограничиваем длину
    if (numbers.length > 11) return value;
    
    // Просто добавляем +7 в начало если его нет
    if (!value.startsWith('+7') && numbers.length > 0) {
      return `+7 ${numbers.slice(0, 10)}`;
    }
    
    return value;
  };

  // ДОБАВЛЯЕМ ФУНКЦИЮ ДЛЯ ВАЛИДАЦИИ
  const validateStep = useCallback((step) => {
    switch (step) {
      case 1:
        const { fullName, phone } = orderData.contact;
        if (!fullName.trim()) return 'Введите ФИО';
        if (!phone.trim()) return 'Введите телефон';
        // Более простая проверка телефона
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 11) {
          return 'Введите корректный номер телефона (11 цифр)';
        }
        return null;
      case 2:
        const { method, address } = orderData.delivery;
        if (method === 'courier') {
          if (!address.trim()) return 'Введите адрес доставки';
        }
        return null;
      default:
        return null;
    }
  }, [orderData]);

  // ОБНОВЛЯЕМ ФУНКЦИЮ nextStep С ВАЛИДАЦИЕЙ
  const nextStep = useCallback(() => {
    const error = validateStep(currentStep);
    if (error) {
      setOrderError(error);
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      setOrderError('');
    }
  }, [currentStep, validateStep]);

  // ОБНОВЛЕННАЯ updateOrderData С ПРОСТОЙ МАСКОЙ
  const updateOrderData = useCallback((step, field, value) => {
    // Для поля phone применяем простую маску
    if (field === 'phone') {
      // Разрешаем удаление и обычный ввод
      if (value === '' || value === '+7') {
        setOrderData(prev => ({
          ...prev,
          [step]: {
            ...prev[step],
            [field]: value
          }
        }));
        return;
      }
      
      // Простая маска - только цифры и +
      const formattedValue = formatPhone(value);
      setOrderData(prev => ({
        ...prev,
        [step]: {
          ...prev[step],
          [field]: formattedValue
        }
      }));
      return;
    }
    
    setOrderData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value
      }
    }));
  }, []);

  const openOrderModal = useCallback(() => {
    if (items.length === 0) {
      setOrderError('Корзина пуста');
      return;
    }
    setIsOrderModalOpen(true);
    setCurrentStep(1);
    setOrderError('');
  }, [items]);

  const closeOrderModal = useCallback(() => {
    setIsOrderModalOpen(false);
    setCurrentStep(1);
    setOrderError('');
    setOrderSuccess(false);
  }, []);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setOrderError('');
    }
  }, [currentStep]);

  // ФУНКЦИЯ ОТПРАВКИ В WHATSAPP
  const submitOrder = useCallback(async () => {
    const error = validateStep(3);
    if (error) {
      setOrderError(error);
      return;
    }

    setIsSubmitting(true);
    setOrderError('');

    try {
      const totalPrice = items.reduce((sum, item) => {
        const price = getItemUnitPrice(item);
        return sum + (price * (item.quantity || 1));
      }, 0);

      const message = `🦁 *Новый заказ MuskLions!*\n\n` +
        `🧾 *Состав заказа:*\n` +
        items.map(item => {
          const itemPrice = getItemUnitPrice(item);
          const itemTotal = itemPrice * item.quantity;
          return `• ${item.name} × ${item.quantity} - ${itemTotal.toLocaleString()} ₽`;
        }).join('\n') +
        `\n\n💰 *Итого:* ${totalPrice.toLocaleString()} ₽\n\n` +
        `👤 *Контактные данные:*\n` +
        `Имя: ${orderData.contact.fullName}\n` +
        `Телефон: ${orderData.contact.phone}\n\n` +
        `🚚 *Доставка:*\n` +
        `Способ: ${orderData.delivery.method === 'courier' ? 'Курьер' : 'Самовывоз'}\n` +
        (orderData.delivery.method === 'courier' ? `Адрес: ${orderData.delivery.address}\n` : '') +
        (orderData.delivery.comment ? `Комментарий: ${orderData.delivery.comment}\n` : '') +
        `\n🕒 *Время заказа:* ${new Date().toLocaleString('ru-RU')}`;

      const phoneNumber = '79292523737';

      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer'
      );
      
      // Показываем успех
      setOrderSuccess(true);
      clearCart();
      
      // Автоматическое закрытие через 4 секунды
      setTimeout(() => {
        closeOrderModal();
      }, 4000);

    } catch (error) {
      setOrderError('Произошла ошибка при оформлении заказа. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  }, [items, orderData, clearCart, closeOrderModal, validateStep]);

  const value = {
    isOrderModalOpen,
    currentStep, 
    orderData,
    isSubmitting,
    orderSuccess,
    orderError,
    items,
    openOrderModal,
    closeOrderModal,
    nextStep,
    prevStep,
    updateOrderData,
    submitOrder,
    validateStep
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
