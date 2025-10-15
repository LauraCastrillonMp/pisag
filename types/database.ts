export type UserRole = "user" | "admin"

export type NewsCategory = "missions" | "discoveries" | "celestial_events"

export type MultimediaType = "image" | "video" | "livestream"

export type Difficulty = "beginner" | "intermediate" | "advanced"

export interface Profile {
  id: string
  username: string
  role: UserRole
  avatar_url?: string
  bio?: string
  xp?: number
  created_at: string
  updated_at: string
}

export interface NewsArticle {
  id: string
  title: string
  content: string
  excerpt?: string
  category: NewsCategory
  image_url?: string
  author_id?: string
  published_at: string
  created_at: string
  updated_at: string
}

export interface ForumThread {
  id: string
  title: string
  category: string
  author_id: string
  is_pinned: boolean
  is_locked: boolean
  created_at: string
  updated_at: string
}

export interface ForumPost {
  id: string
  thread_id: string
  author_id: string
  content: string
  is_edited: boolean
  created_at: string
  updated_at: string
}

export interface KnowledgeSection {
  id: string
  title: string
  description?: string
  difficulty?: Difficulty
  icon?: string
  created_at: string
}

export interface QuizQuestion {
  id: string
  section_id: string
  question: string
  options: string[]
  correct_answer: number
  explanation?: string
  points: number
  created_at: string
}

export interface QuizAttempt {
  id: string
  user_id: string
  section_id: string
  score: number
  total_questions: number
  completed_at: string
}

export interface MultimediaResource {
  id: string
  title: string
  description?: string
  type: MultimediaType
  url: string
  thumbnail_url?: string
  category?: string
  uploaded_by?: string
  created_at: string
}
