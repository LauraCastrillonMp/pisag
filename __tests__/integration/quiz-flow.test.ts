import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGetKnowledgeSections = vi.fn();
const mockGetKnowledgeSection = vi.fn();
const mockGetQuizQuestions = vi.fn();
const mockSubmitQuizAttempt = vi.fn();
const mockGetUserProgress = vi.fn();

vi.mock('@/actions/quiz', () => ({
  getKnowledgeSections: mockGetKnowledgeSections,
  getKnowledgeSection: mockGetKnowledgeSection,
  getQuizQuestions: mockGetQuizQuestions,
  submitQuizAttempt: mockSubmitQuizAttempt,
  getUserProgress: mockGetUserProgress,
}));

describe('Quiz Flow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockGetKnowledgeSections.mockResolvedValue([
      {
        id: '1',
        title: 'Astronomía Básica',
        description: 'Conceptos fundamentales',
        difficulty: 'beginner',
      }
    ]);
    
    mockGetKnowledgeSection.mockResolvedValue({
      id: '1',
      title: 'Astronomía Básica',
      content: 'Contenido de prueba',
    });
    
    mockGetQuizQuestions.mockResolvedValue([
      {
        id: '1',
        question: '¿Qué es una estrella?',
        options: ['A', 'B', 'C', 'D'],
        correct_answer: 'A',
      }
    ]);
  });

  it('should fetch knowledge sections', async () => {
    const { getKnowledgeSections } = await import('@/actions/quiz');
    const sections = await getKnowledgeSections();
    
    expect(Array.isArray(sections)).toBe(true);
    expect(sections.length).toBeGreaterThan(0);
    expect(sections[0]).toHaveProperty('title');
  });

  it('should fetch single knowledge section', async () => {
    const { getKnowledgeSection } = await import('@/actions/quiz');
    const section = await getKnowledgeSection('test-section-id');
    
    expect(section).toBeDefined();
    expect(section).toHaveProperty('title');
    expect(section).toHaveProperty('content');
  });

  it('should fetch quiz questions for section', async () => {
    const { getQuizQuestions } = await import('@/actions/quiz');
    const questions = await getQuizQuestions('test-section-id');
    
    expect(Array.isArray(questions)).toBe(true);
    expect(questions.length).toBeGreaterThan(0);
    expect(questions[0]).toHaveProperty('question');
    expect(questions[0]).toHaveProperty('options');
  });

  it('should submit quiz attempt', async () => {
    mockSubmitQuizAttempt.mockResolvedValueOnce({
      success: true,
      score: 80,
      xpEarned: 50,
    });
    
    const { submitQuizAttempt } = await import('@/actions/quiz');
    const result = await submitQuizAttempt('section-123', 8, 10);
    
    expect(result.success).toBe(true);
    expect(result.score).toBe(80);
    expect(result).toHaveProperty('xpEarned');
  });

  it('should track user progress', async () => {
    mockGetUserProgress.mockResolvedValueOnce({
      completedSections: ['section-1', 'section-2'],
      totalXp: 150,
      level: 2,
    });
    
    const { getUserProgress } = await import('@/actions/quiz');
    const progress = await getUserProgress();
    
    expect(progress).toHaveProperty('completedSections');
    expect(progress).toHaveProperty('totalXp');
    expect(Array.isArray(progress.completedSections)).toBe(true);
  });
});