-- Add XP column to existing profiles table
-- This migration adds the XP field to profiles for users who already exist

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 0;

-- Update existing users to have 0 XP if they don't have it set
UPDATE public.profiles SET xp = 0 WHERE xp IS NULL;
