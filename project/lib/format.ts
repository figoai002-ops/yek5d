// Format utilities

// Türk Lirası formatı - Hydration safe
export function tl(amount: number): string {
  // Server-side ve client-side tutarlılık için sabit format kullan
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₺0,00';
  }
  
  return `₺${amount.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

// ID generator
export function genId(prefix: string = 'ORDER'): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return `${prefix}-${year}${month}${day}-${random}`;
}

// Date formatting
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
}

// Phone number formatting
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
  }
  return phone;
}