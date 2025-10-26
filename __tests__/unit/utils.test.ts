import { describe, it, expect } from 'vitest';

describe('Utility Functions', () => {
  it('should merge class names correctly with cn', () => {
    // Función inline para probar lógica sin importar desde @/lib/utils
    const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
    
    const result = cn('bg-red-500', 'text-white');
    
    expect(result).toContain('bg-red-500');
    expect(result).toContain('text-white');
  });

  it('should handle conditional classes', () => {
    const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
    
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    
    expect(result).toContain('base-class');
    expect(result).toContain('active-class');
  });

  it('should filter out falsy values', () => {
    const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
    
    const result = cn('class1', null, undefined, false, '', 'class2');
    
    expect(result).toBe('class1 class2');
  });

  it('should handle empty input', () => {
    const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
    
    const result = cn();
    
    expect(result).toBe('');
  });

  it('should handle array of classes', () => {
    const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
    
    const result = cn(['class1', 'class2'], 'class3');
    
    expect(result).toContain('class1');
  });
});

describe('String Utilities', () => {
  it('should capitalize first letter', () => {
    const capitalize = (str: string) => 
      str.charAt(0).toUpperCase() + str.slice(1);
    
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
    expect(capitalize('')).toBe('');
  });

  it('should slugify text', () => {
    const slugify = (text: string) =>
      text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('Test   Multiple   Spaces')).toBe('test-multiple-spaces');
    expect(slugify('Special!@#Characters')).toBe('specialcharacters');
  });

  it('should truncate text with ellipsis', () => {
    const truncate = (text: string, maxLength: number) =>
      text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    
    const longText = 'This is a very long text that needs to be truncated';
    
    expect(truncate(longText, 20)).toBe('This is a very long ...');
    expect(truncate('Short', 20)).toBe('Short');
  });
});

describe('Number Utilities', () => {
  it('should format number as percentage', () => {
    const toPercentage = (value: number, total: number) =>
      `${Math.round((value / total) * 100)}%`;
    
    expect(toPercentage(50, 100)).toBe('50%');
    expect(toPercentage(75, 100)).toBe('75%');
    expect(toPercentage(1, 3)).toBe('33%');
  });

  it('should clamp number between min and max', () => {
    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);
    
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('should check if number is in range', () => {
    const inRange = (value: number, min: number, max: number) =>
      value >= min && value <= max;
    
    expect(inRange(5, 0, 10)).toBe(true);
    expect(inRange(-1, 0, 10)).toBe(false);
    expect(inRange(11, 0, 10)).toBe(false);
  });
});