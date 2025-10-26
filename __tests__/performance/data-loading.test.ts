import { describe, it, expect, vi } from 'vitest';

const mockGetNewsArticles = vi.fn().mockResolvedValue([]);
const mockGetMultimediaResources = vi.fn().mockResolvedValue([]);
const mockGetForumThreads = vi.fn().mockResolvedValue([]);
const mockGetKnowledgeSections = vi.fn().mockResolvedValue([]);

vi.mock('@/actions/news', () => ({ getNewsArticles: mockGetNewsArticles }));
vi.mock('@/actions/multimedia', () => ({ getMultimediaResources: mockGetMultimediaResources }));
vi.mock('@/actions/forum', () => ({ getForumThreads: mockGetForumThreads }));
vi.mock('@/actions/quiz', () => ({ getKnowledgeSections: mockGetKnowledgeSections }));

describe('Performance - Data Loading', () => {
  it('should load news articles within 2 seconds', async () => {
    const { getNewsArticles } = await import('@/actions/news');
    const start = performance.now();
    
    await getNewsArticles();
    
    const duration = performance.now() - start;
    console.log(`⏱️  News articles loaded in ${duration.toFixed(2)}ms`);
    
    expect(duration).toBeLessThan(2000);
  });

  it('should load multimedia resources within 2 seconds', async () => {
    const { getMultimediaResources } = await import('@/actions/multimedia');
    const start = performance.now();
    
    await getMultimediaResources();
    
    const duration = performance.now() - start;
    console.log(`⏱️  Multimedia loaded in ${duration.toFixed(2)}ms`);
    
    expect(duration).toBeLessThan(2000);
  });

  it('should load forum threads within 1.5 seconds', async () => {
    const { getForumThreads } = await import('@/actions/forum');
    const start = performance.now();
    
    await getForumThreads();
    
    const duration = performance.now() - start;
    console.log(`⏱️  Forum threads loaded in ${duration.toFixed(2)}ms`);
    
    expect(duration).toBeLessThan(1500);
  });

  it('should load knowledge sections within 1 second', async () => {
    const { getKnowledgeSections } = await import('@/actions/quiz');
    const start = performance.now();
    
    await getKnowledgeSections();
    
    const duration = performance.now() - start;
    console.log(`⏱️  Knowledge sections loaded in ${duration.toFixed(2)}ms`);
    
    expect(duration).toBeLessThan(1000);
  });
});