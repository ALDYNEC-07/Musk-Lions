import { getItemUnitPrice, parsePrice } from './price';

describe('price utils', () => {
  test('parsePrice extracts number from formatted string', () => {
    expect(parsePrice('12 500 ₽')).toBe(12500);
  });

  test('parsePrice returns finite number as is', () => {
    expect(parsePrice(7200)).toBe(7200);
  });

  test('parsePrice returns 0 for unsupported input', () => {
    expect(parsePrice(null)).toBe(0);
    expect(parsePrice('')).toBe(0);
    expect(parsePrice('abc')).toBe(0);
  });

  test('getItemUnitPrice prefers numericPrice', () => {
    expect(getItemUnitPrice({ numericPrice: 5000, price: '10 000 ₽' })).toBe(5000);
  });

  test('getItemUnitPrice falls back to price string', () => {
    expect(getItemUnitPrice({ price: '10 500 ₽' })).toBe(10500);
  });

  test('getItemUnitPrice handles invalid item safely', () => {
    expect(getItemUnitPrice(undefined)).toBe(0);
  });
});
