import { SavedOrder } from '../types';

const STORAGE_KEY = 'cw_orders_list';

export function getSavedOrders(): SavedOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveNewOrder(order: SavedOrder): void {
  try {
    const existing = getSavedOrders();
    const updated = [order, ...existing.filter(o => o.id !== order.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
  }
}

export function findOrder(query: string): SavedOrder | undefined {
  const clean = query.trim().toLowerCase().replace(/\s+/g, '');
  if (!clean) return undefined;
  const list = getSavedOrders();
  return list.find(o => 
    o.id.toLowerCase().replace(/[^a-z0-9]/g, '') === clean.replace(/[^a-z0-9]/g, '') ||
    o.customer.phone.replace(/[^0-9]/g, '').includes(clean)
  );
}
