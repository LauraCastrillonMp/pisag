-- Insert sample forum threads and posts
-- We'll create some sample threads first

-- Get a random user ID for sample data (or use NULL if no users exist yet)
DO $$
DECLARE
  sample_user_id UUID;
BEGIN
  -- Try to get the first user, or use a placeholder
  SELECT id INTO sample_user_id FROM auth.users LIMIT 1;
  
  -- If no users exist, we'll insert with NULL author_id (will be handled by RLS)
  -- Insert sample threads
  INSERT INTO public.forum_threads (title, category, author_id, is_pinned) VALUES
    ('Bienvenida al foro de astronomía', 'general', sample_user_id, true),
    ('Expresiones Espaciales: Comparte tus fotos', 'astrophotography', sample_user_id, false),
    ('Misiones Espaciales Actuales', 'missions', sample_user_id, false),
    ('Noticia Gaia: Nuevo mapa estelar', 'news', sample_user_id, false);
END $$;
