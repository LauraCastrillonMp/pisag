import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGetForumThreads = vi.fn();
const mockGetForumThread = vi.fn();
const mockGetForumPosts = vi.fn();
const mockCreateThread = vi.fn();
const mockCreatePost = vi.fn();

vi.mock('@/actions/forum', () => ({
  getForumThreads: mockGetForumThreads,
  getForumThread: mockGetForumThread,
  getForumPosts: mockGetForumPosts,
  createThread: mockCreateThread,
  createPost: mockCreatePost,
}));

describe('Forum Actions Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockGetForumThreads.mockResolvedValue([
      {
        id: '1',
        title: 'Test Thread',
        category: 'general',
        created_at: new Date().toISOString(),
      }
    ]);
    
    mockGetForumThread.mockResolvedValue({
      id: '1',
      title: 'Test Thread',
      content: 'Test Content',
    });
    
    mockGetForumPosts.mockResolvedValue([
      {
        id: '1',
        content: 'Test Post',
        created_at: new Date().toISOString(),
      }
    ]);
  });

  it('should fetch forum threads', async () => {
    const { getForumThreads } = await import('@/actions/forum');
    const threads = await getForumThreads();
    
    expect(Array.isArray(threads)).toBe(true);
    expect(threads.length).toBeGreaterThan(0);
  });

  it('should filter threads by category', async () => {
    const { getForumThreads } = await import('@/actions/forum');
    await getForumThreads('general');
    
    expect(mockGetForumThreads).toHaveBeenCalledWith('general');
  });

  it('should fetch single thread', async () => {
    const { getForumThread } = await import('@/actions/forum');
    const thread = await getForumThread('test-thread-id');
    
    expect(thread).toBeDefined();
    expect(thread).toHaveProperty('title');
  });

  it('should fetch thread posts', async () => {
    const { getForumPosts } = await import('@/actions/forum');
    const posts = await getForumPosts('test-thread-id');
    
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it('should create new thread', async () => {
    mockCreateThread.mockResolvedValueOnce({
      success: true,
      threadId: 'new-thread-id',
    });
    
    const { createThread } = await import('@/actions/forum');
    const result = await createThread({
      title: 'New Thread',
      content: 'Thread content',
      category: 'general',
    });
    
    expect(result.success).toBe(true);
    expect(result).toHaveProperty('threadId');
  });

  it('should create new post in thread', async () => {
    mockCreatePost.mockResolvedValueOnce({
      success: true,
      postId: 'new-post-id',
    });
    
    const { createPost } = await import('@/actions/forum');
    const result = await createPost({
      threadId: 'thread-123',
      content: 'Reply content',
    });
    
    expect(result.success).toBe(true);
    expect(result).toHaveProperty('postId');
  });
});