/**
 * Simple utility to combine class names (alternative to clsx)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes
    .filter((item) => typeof item === 'string' && item.length > 0)
    .join(' ')
    .trim();
}