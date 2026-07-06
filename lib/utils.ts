export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(dateString));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}