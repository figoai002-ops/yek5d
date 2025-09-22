import type { CartItem, Order, EmailRecord } from '@/types/ecom';

// Local Storage anahtarları
const KEYS = {
  CART: 'yeklab.cart',
  ORDERS: 'yeklab.orders',
  EMAILS: 'yeklab.emails'
} as const;

// Generic localStorage utilities
export function getLS<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function setLS<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('localStorage setItem error:', error);
  }
}

export function pushLS<T>(key: string, item: T): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getLS<T[]>(key) || [];
    existing.push(item);
    setLS(key, existing);
  } catch (error) {
    console.error('localStorage pushLS error:', error);
  }
}

// Cart specific functions
export function loadCart(): CartItem[] {
  return getLS<CartItem[]>(KEYS.CART) || [];
}

export function saveCart(items: CartItem[]): void {
  setLS(KEYS.CART, items);
}

// Orders specific functions
export function loadOrders(): Order[] {
  return getLS<Order[]>(KEYS.ORDERS) || [];
}

export function saveOrder(order: Order): void {
  pushLS(KEYS.ORDERS, order);
}

// Email specific functions
export function pushEmail(email: EmailRecord): void {
  pushLS(KEYS.EMAILS, email);
}

export function loadEmails(): EmailRecord[] {
  return getLS<EmailRecord[]>(KEYS.EMAILS) || [];
}

export function getEmails(): EmailRecord[] {
  return loadEmails();
}

export function getEmailsByOrderId(orderId: string): EmailRecord[] {
  const emails = loadEmails();
  return emails.filter(email => email.id.includes(orderId));
}

// Single order functions
export function loadOrder(orderId: string): Order | null {
  const orders = loadOrders();
  return orders.find(order => order.id === orderId) || null;
}

// Admin functions
export function getAllOrders(): Order[] {
  return loadOrders();
}

export function clearAllOrders(): void {
  setLS(KEYS.ORDERS, []);
}

export function clearAllEmails(): void {
  setLS(KEYS.EMAILS, []);
}