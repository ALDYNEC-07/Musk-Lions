export const parsePrice = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return 0;
  }

  const normalized = value.replace(/[^\d]/g, '');
  return normalized ? Number(normalized) : 0;
};

export const getItemUnitPrice = (item) => {
  if (!item || typeof item !== 'object') {
    return 0;
  }

  return parsePrice(item.numericPrice ?? item.price);
};
