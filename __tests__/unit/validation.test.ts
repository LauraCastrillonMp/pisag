import { describe, it, expect } from 'vitest';

describe('Form Validation', () => {
  it('should validate email format', () => {
    const isValidEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
    expect(isValidEmail('invalid.email')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
  });

  it('should validate username length', () => {
    const isValidUsername = (username: string) => 
      username.length >= 3 && username.length <= 32;
    
    expect(isValidUsername('abc')).toBe(true);
    expect(isValidUsername('user123')).toBe(true);
    expect(isValidUsername('ab')).toBe(false);
    expect(isValidUsername('a'.repeat(33))).toBe(false);
  });

  it('should validate password strength', () => {
    const isStrongPassword = (password: string) => 
      password.length >= 8 && 
      /[A-Z]/.test(password) && 
      /[a-z]/.test(password) && // ← AGREGADO: Verifica minúsculas
      /[0-9]/.test(password);
    
    expect(isStrongPassword('Password123')).toBe(true);
    expect(isStrongPassword('Secure1Pass')).toBe(true);
    expect(isStrongPassword('weak')).toBe(false);
    expect(isStrongPassword('nodigits')).toBe(false);
    expect(isStrongPassword('NOUPPER123')).toBe(false); // ← Ahora pasará correctamente
  });
});

describe('Quiz Validation', () => {
  it('should validate all questions answered', () => {
    const hasAnsweredAll = (answers: (string | null)[], totalQuestions: number) => 
      answers.length === totalQuestions && 
      answers.every(a => a !== null && a !== undefined);
    
    const completeAnswers = ['A', 'B', 'C', 'D'];
    expect(hasAnsweredAll(completeAnswers, 4)).toBe(true);
    
    const incompleteAnswers = ['A', null, 'C', 'D'];
    expect(hasAnsweredAll(incompleteAnswers, 4)).toBe(false);
  });

  it('should calculate quiz score correctly', () => {
    const calculateScore = (correct: number, total: number) => 
      Math.round((correct / total) * 100);
    
    expect(calculateScore(8, 10)).toBe(80);
    expect(calculateScore(5, 10)).toBe(50);
    expect(calculateScore(10, 10)).toBe(100);
    expect(calculateScore(0, 10)).toBe(0);
  });
});