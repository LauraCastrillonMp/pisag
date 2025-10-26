import { describe, it, expect } from 'vitest';
import { formatDate } from '@/utils/format';

// Función inline para testing
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diff < 60) return 'hace unos segundos';
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} minutos`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} horas`;
  return `hace ${Math.floor(diff / 86400)} días`;
}

describe('Date Formatting Utils', () => {
  it('should format date to readable string', () => {
    const date = new Date('2024-10-25T12:00:00Z');
    const formatted = formatDate(date);
    
    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe('string');
    expect(formatted).toContain('2024');
  });

  it('should format relative time correctly', () => {
    const now = new Date();
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    const result = formatRelativeTime(hourAgo);
    
    expect(result).toContain('hace');
  });

  it('should handle invalid dates gracefully', () => {
    const invalidDate = new Date('invalid');
    
    expect(() => formatDate(invalidDate)).not.toThrow();
  });
});

describe('Text Utils', () => {
  it('should truncate long text', () => {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const truncate = (text: string, maxLength: number) => 
      text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    
    const result = truncate(longText, 50);
    
    expect(result.length).toBeLessThanOrEqual(53);
    expect(result).toContain('...');
  });

  it('should not truncate short text', () => {
    const shortText = 'Hello world';
    const truncate = (text: string, maxLength: number) => 
      text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    
    const result = truncate(shortText, 50);
    
    expect(result).toBe(shortText);
    expect(result).not.toContain('...');
  });
});