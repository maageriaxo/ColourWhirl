/**
 * Utility to resolve public assets correctly in both local development
 * and subdirectory production deployments (like GitHub Pages /ColourWhirl/).
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};
