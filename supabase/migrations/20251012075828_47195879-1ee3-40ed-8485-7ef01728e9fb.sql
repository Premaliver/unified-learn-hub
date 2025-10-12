-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('institution', 'student', 'teacher', 'government');

-- Create user roles table (CRITICAL for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles table for common user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Institutions table
CREATE TABLE public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  aishe_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  type TEXT,
  location TEXT,
  state TEXT,
  established_year INTEGER,
  website TEXT,
  total_students INTEGER DEFAULT 0,
  total_faculty INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

-- NIRF rankings table
CREATE TABLE public.nirf_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE NOT NULL,
  year INTEGER NOT NULL,
  overall_rank INTEGER,
  tlr_score DECIMAL(5,2),
  rpc_score DECIMAL(5,2),
  go_score DECIMAL(5,2),
  oi_score DECIMAL(5,2),
  perception_score DECIMAL(5,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (institution_id, year)
);

ALTER TABLE public.nirf_rankings ENABLE ROW LEVEL SECURITY;

-- Students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  aadhar_id TEXT NOT NULL UNIQUE,
  institution_id UUID REFERENCES public.institutions(id) ON DELETE SET NULL,
  enrollment_number TEXT,
  course TEXT,
  year_of_study INTEGER,
  cgpa DECIMAL(4,2),
  date_of_birth DATE,
  gender TEXT,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Teachers table
CREATE TABLE public.teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  apar_id TEXT NOT NULL UNIQUE,
  institution_id UUID REFERENCES public.institutions(id) ON DELETE SET NULL,
  department TEXT,
  designation TEXT,
  specialization TEXT,
  years_of_experience INTEGER,
  research_papers INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

-- Government schemes table
CREATE TABLE public.schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  ministry TEXT,
  eligibility_criteria JSONB,
  benefits TEXT,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;

-- Scheme beneficiaries table
CREATE TABLE public.scheme_beneficiaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheme_id UUID REFERENCES public.schemes(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
  application_date TIMESTAMPTZ DEFAULT now(),
  approval_status TEXT DEFAULT 'pending',
  approved_date TIMESTAMPTZ,
  amount_disbursed DECIMAL(12,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (student_id IS NOT NULL OR institution_id IS NOT NULL)
);

ALTER TABLE public.scheme_beneficiaries ENABLE ROW LEVEL SECURITY;

-- Activities/Events table
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  activity_type TEXT,
  status TEXT DEFAULT 'completed',
  activity_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Government users can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'government'));

-- RLS Policies for institutions
CREATE POLICY "Institutions can view their own data"
  ON public.institutions FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'government'));

CREATE POLICY "Institutions can update their own data"
  ON public.institutions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Institutions can insert their own data"
  ON public.institutions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for students
CREATE POLICY "Students can view their own data"
  ON public.students FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'government') OR public.has_role(auth.uid(), 'institution') OR public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Students can update their own data"
  ON public.students FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Students can insert their own data"
  ON public.students FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for teachers
CREATE POLICY "Teachers can view their own data"
  ON public.teachers FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'government') OR public.has_role(auth.uid(), 'institution'));

CREATE POLICY "Teachers can update their own data"
  ON public.teachers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can insert their own data"
  ON public.teachers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for NIRF rankings
CREATE POLICY "Anyone can view NIRF rankings"
  ON public.nirf_rankings FOR SELECT
  USING (true);

CREATE POLICY "Institutions can manage their NIRF data"
  ON public.nirf_rankings FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.institutions
    WHERE institutions.id = nirf_rankings.institution_id
    AND institutions.user_id = auth.uid()
  ));

-- RLS Policies for schemes
CREATE POLICY "Anyone can view active schemes"
  ON public.schemes FOR SELECT
  USING (is_active = true OR public.has_role(auth.uid(), 'government'));

CREATE POLICY "Government can manage schemes"
  ON public.schemes FOR ALL
  USING (public.has_role(auth.uid(), 'government'));

-- RLS Policies for scheme beneficiaries
CREATE POLICY "Users can view their own beneficiary records"
  ON public.scheme_beneficiaries FOR SELECT
  USING (
    (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid())) OR
    (institution_id IN (SELECT id FROM public.institutions WHERE user_id = auth.uid())) OR
    public.has_role(auth.uid(), 'government')
  );

CREATE POLICY "Students and institutions can apply for schemes"
  ON public.scheme_beneficiaries FOR INSERT
  WITH CHECK (
    (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid())) OR
    (institution_id IN (SELECT id FROM public.institutions WHERE user_id = auth.uid()))
  );

-- RLS Policies for activities
CREATE POLICY "Anyone can view activities"
  ON public.activities FOR SELECT
  USING (true);

CREATE POLICY "Institutions can manage their activities"
  ON public.activities FOR ALL
  USING (institution_id IN (SELECT id FROM public.institutions WHERE user_id = auth.uid()));

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_institutions_updated_at
  BEFORE UPDATE ON public.institutions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at
  BEFORE UPDATE ON public.teachers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_schemes_updated_at
  BEFORE UPDATE ON public.schemes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();