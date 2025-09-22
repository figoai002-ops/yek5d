/**
 * Slug generation utilities - data-only module
 */

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replaceAll('ı','i').replaceAll('ğ','g').replaceAll('ü','u')
    .replaceAll('ş','s').replaceAll('ö','o').replaceAll('ç','c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function productSlug(p: { model: string; name: string }) {
  return slugify(`${p.model} ${p.name}`);
}

// Alias for convenience
export const generateSlug = slugify;