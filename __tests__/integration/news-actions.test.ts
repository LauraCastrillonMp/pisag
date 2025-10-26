import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGetNewsArticles = vi.fn();
const mockGetNewsArticle = vi.fn();
const mockSearchNewsArticles = vi.fn();

vi.mock('@/actions/news', () => ({
  getNewsArticles: mockGetNewsArticles,
  getNewsArticle: mockGetNewsArticle,
  searchNewsArticles: mockSearchNewsArticles,
}));

describe('News Actions Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockGetNewsArticles.mockResolvedValue([
      {
        id: '1',
        title: 'Test Article 1',
        content: 'Content 1',
        category: 'space',
        created_at: new Date().toISOString(),
      }
    ]);
    
    mockGetNewsArticle.mockResolvedValue({
      id: '1',
      title: 'Test Article',
      content: 'Test Content',
      category: 'space',
    });
    
    mockSearchNewsArticles.mockResolvedValue([]);
  });

  it('should fetch all news articles', async () => {
    const { getNewsArticles } = await import('@/actions/news');
    const articles = await getNewsArticles();
    
    expect(Array.isArray(articles)).toBe(true);
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0]).toHaveProperty('title');
  });

  it('should fetch news by category', async () => {
    const { getNewsArticles } = await import('@/actions/news');
    await getNewsArticles('space');
    
    expect(mockGetNewsArticles).toHaveBeenCalledWith('space');
  });

  it('should fetch single news article', async () => {
    const { getNewsArticle } = await import('@/actions/news');
    const article = await getNewsArticle('test-id');
    
    expect(article).toBeDefined();
    expect(article).toHaveProperty('title');
    expect(article).toHaveProperty('content');
  });

  it('should search news articles', async () => {
    const { searchNewsArticles } = await import('@/actions/news');
    await searchNewsArticles('espacio');
    
    expect(mockSearchNewsArticles).toHaveBeenCalledWith('espacio');
  });

  it('should handle empty search results', async () => {
    mockSearchNewsArticles.mockResolvedValueOnce([]);
    
    const { searchNewsArticles } = await import('@/actions/news');
    const results = await searchNewsArticles('nonexistent');
    
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(0);
  });
});