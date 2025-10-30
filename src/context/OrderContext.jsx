import React, { createContext, useContext, useState, useCallback } from 'react';
import { useCart } from './CartContext';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { items, clearCart, totalCount } = useCart();
  
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
      postalCode: '',
      comment: '',
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');

  // ДОБАВЛЯЕМ ФУНКЦИЮ ДЛЯ ВАЛИДАЦИИ
  const validateStep = useCallback((step) => {
    switch (step) {
      case 1:
        const { fullName, phone, email } = orderData.contact;
        if (!fullName.trim()) return 'Введите ФИО';
        if (!phone.trim()) return 'Введите телефон';
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

  // ОСТАВЛЯЕМ ОСТАЛЬНЫЕ ФУНКЦИИ БЕЗ ИЗМЕНЕНИЙ
  const openOrderModal = useCallback(() => {
    console.log('🎯 openOrderModal вызван!', items.length); // ОТЛАДКА
    if (items.length === 0) {
      setOrderError('Корзина пуста');
      return;
    }
    setIsOrderModalOpen(true);
    setCurrentStep(1);
    setOrderError('');
    console.log('✅ OrderModal открыт!'); // ОТЛАДКА
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

  const updateOrderData = useCallback((step, field, value) => {
    setOrderData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value
      }
    }));
  }, []);

  // ДОБАВЛЯЕМ ФУНКЦИЮ submitOrder
  const submitOrder = useCallback(async () => {
    setIsSubmitting(true);
    setOrderError('');

    try {
      // Имитация отправки заказа
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Успешное оформление
      setOrderSuccess(true);
      clearCart();
      
      // Автоматическое закрытие через 3 секунды
      setTimeout(() => {
        closeOrderModal();
      }, 3000);

    } catch (error) {
      setOrderError('Произошла ошибка при оформлении заказа. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  }, [clearCart, closeOrderModal]);

  const value = {
    isOrderModalOpen,
    currentStep, 
    orderData,
    isSubmitting,
    orderSuccess,
    orderError,
    items,
    totalCount,
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