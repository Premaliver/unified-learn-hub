-- Comprehensive fix for duplicate key violations in profiles table
-- This migration addresses all potential causes of duplicate key errors

-- Step 1: Temporarily disable the trigger to prevent conflicts during cleanup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 2: Clean up any duplicate profiles, keeping the most recent one
-- First, identify duplicates
CREATE TEMP TABLE duplicate_profiles AS
SELECT id, COUNT(*) as count
FROM public.profiles
GROUP BY id
HAVING COUNT(*) > 1;

-- Remove duplicates, keeping the one with the most recent updated_at
DELETE FROM public.profiles
WHERE id IN (
  SELECT dp.id
  FROM duplicate_profiles dp
  JOIN public.profiles p1 ON dp.id = p1.id
  WHERE p1.updated_at < (
    SELECT MAX(p2.updated_at)
    FROM public.profiles p2
    WHERE p2.id = dp.id
  )
);

-- Step 3: Ensure all auth users have profiles
INSERT INTO public.profiles (id, email, full_name)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', '')
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Step 4: Create a more robust trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile only if it doesn't exist, with conflict resolution
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    updated_at = now();
  RETURN NEW;
END;
$$;

-- Step 5: Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 6: Clean up temporary table
DROP TABLE IF EXISTS duplicate_profiles;
