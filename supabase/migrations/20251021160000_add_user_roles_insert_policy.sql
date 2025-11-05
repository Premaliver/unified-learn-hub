-- Add INSERT policy for user_roles table to allow users to insert their own roles during registration
CREATE POLICY "Users can insert their own roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);
