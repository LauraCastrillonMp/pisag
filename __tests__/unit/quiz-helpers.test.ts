import { describe, it, expect } from 'vitest';

describe('Quiz Helpers', () => {
  it('should determine passing grade', () => {
    const isPassing = (score: number, passingScore = 70) => score >= passingScore;
    
    expect(isPassing(80)).toBe(true);
    expect(isPassing(70)).toBe(true);
    expect(isPassing(69)).toBe(false);
    expect(isPassing(0)).toBe(false);
  });

  it('should calculate XP earned from quiz', () => {
    const calculateXP = (score: number, totalQuestions: number) => {
      const baseXP = 10;
      return Math.floor((score / totalQuestions) * baseXP);
    };
    
    expect(calculateXP(10, 10)).toBe(10);
    expect(calculateXP(8, 10)).toBe(8);
    expect(calculateXP(5, 10)).toBe(5);
  });

  it('should shuffle array for random question order', () => {
    const shuffle = <T,>(array: T[]): T[] => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);
    
    expect(shuffled.length).toBe(original.length);
    expect(shuffled.sort()).toEqual(original);
  });
});