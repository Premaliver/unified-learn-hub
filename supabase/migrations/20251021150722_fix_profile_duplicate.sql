-- Fix duplicate key violation in profiles table
-- This migration handles the case where profiles might already exist

-- First, check if the trigger is causing issues and temporarily disable it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Remove the function temporarily
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Insert profiles only if they don't exist
INSERT INTO public.profiles (id, email, full_name)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', '')
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- Recreate the function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only insert if profile doesn't exist
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
