-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies: authenticated users can read all profiles, but only update their own
CREATE POLICY "Authenticated users can view all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- DROP existing overly permissive anonymous policies for clients table
DROP POLICY IF EXISTS "Anon can insert clients" ON public.clients;
DROP POLICY IF EXISTS "Anon can select clients" ON public.clients;
DROP POLICY IF EXISTS "Anon can update clients" ON public.clients;
DROP POLICY IF EXISTS "Enable insert for anon" ON public.clients;

-- CREATE secure policies for clients - require authentication
CREATE POLICY "Authenticated users can view all clients"
  ON public.clients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert clients"
  ON public.clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update clients"
  ON public.clients
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete clients"
  ON public.clients
  FOR DELETE
  TO authenticated
  USING (true);

-- DROP existing overly permissive anonymous policies for appointments table
DROP POLICY IF EXISTS "Anon can insert appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anon can select appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anon can update appointments" ON public.appointments;
DROP POLICY IF EXISTS "Enable insert for anon" ON public.appointments;

-- CREATE secure policies for appointments - require authentication
CREATE POLICY "Authenticated users can view all appointments"
  ON public.appointments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert appointments"
  ON public.appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update appointments"
  ON public.appointments
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete appointments"
  ON public.appointments
  FOR DELETE
  TO authenticated
  USING (true);