import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

const ITEM_ONE = { id: 1, name: '1.0', price: '12 500 ₽' };
const ITEM_TWO = { id: 2, name: '2.0', price: '7 200 ₽' };

const CartHarness = () => {
  const { items, totalCount, addItem, updateQuantity, clearCart } = useCart();

  return (
    <div>
      <div data-testid="items-json">{JSON.stringify(items)}</div>
      <div data-testid="total-count">{totalCount}</div>

      <button type="button" onClick={() => addItem(ITEM_ONE)}>
        add-one
      </button>
      <button type="button" onClick={() => addItem(ITEM_TWO)}>
        add-two
      </button>
      <button type="button" onClick={() => updateQuantity(1, 3)}>
        set-one-qty-3
      </button>
      <button type="button" onClick={() => updateQuantity(1, 0)}>
        remove-one-by-qty
      </button>
      <button type="button" onClick={clearCart}>
        clear
      </button>
    </div>
  );
};

const renderCart = () =>
  render(
    <CartProvider>
      <CartHarness />
    </CartProvider>
  );

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('restores cart data from localStorage on mount', async () => {
    localStorage.setItem(
      'muskLionsCart',
      JSON.stringify({
        items: [{ id: 99, name: 'Saved', price: '9 999 ₽', numericPrice: 9999, quantity: 2 }],
        totalCount: 2
      })
    );

    renderCart();

    await waitFor(() => {
      expect(screen.getByTestId('total-count')).toHaveTextContent('2');
    });

    expect(screen.getByTestId('items-json')).toHaveTextContent('"id":99');
  });

  test('adds items, updates quantity and persists normalized price', async () => {
    renderCart();

    fireEvent.click(screen.getByText('add-one'));
    fireEvent.click(screen.getByText('add-one'));
    fireEvent.click(screen.getByText('add-two'));

    expect(screen.getByTestId('total-count')).toHaveTextContent('3');

    fireEvent.click(screen.getByText('set-one-qty-3'));
    expect(screen.getByTestId('total-count')).toHaveTextContent('4');

    const savedCart = JSON.parse(localStorage.getItem('muskLionsCart'));
    const firstItem = savedCart.items.find((item) => item.id === 1);
    expect(firstItem.numericPrice).toBe(12500);
    expect(firstItem.quantity).toBe(3);

    fireEvent.click(screen.getByText('remove-one-by-qty'));
    expect(screen.getByTestId('total-count')).toHaveTextContent('1');

    fireEvent.click(screen.getByText('clear'));

    await waitFor(() => {
      expect(screen.getByTestId('total-count')).toHaveTextContent('0');
    });
    expect(screen.getByTestId('items-json')).toHaveTextContent('[]');
  });
});
