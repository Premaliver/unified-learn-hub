-- Create database and user
CREATE DATABASE eduunify_db;
CREATE USER eduunify_user WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE eduunify_db TO eduunify_user;

-- Connect to the database
\c eduunify_db;

-- Grant permissions
GRANT ALL ON SCHEMA public TO eduunify_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO eduunify_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO eduunify_user;

-- Create enum for user roles
CREATE TYPE app_role AS ENUM ('institution', 'student', 'teacher', 'government');

-- Create users table for authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role app_role NOT NULL,
  full_name TEXT,
  national_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create profiles table for common user data
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create institutions table
CREATE TABLE institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
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

-- Create NIRF rankings table
CREATE TABLE nirf_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE NOT NULL,
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

-- Create students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  aadhar_id TEXT NOT NULL UNIQUE,
  institution_id UUID REFERENCES institutions(id) ON DELETE SET NULL,
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

-- Create teachers table
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  apar_id TEXT NOT NULL UNIQUE,
  institution_id UUID REFERENCES institutions(id) ON DELETE SET NULL,
  department TEXT,
  designation TEXT,
  specialization TEXT,
  years_of_experience INTEGER,
  research_papers INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create government schemes table
CREATE TABLE schemes (
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

-- Create scheme beneficiaries table
CREATE TABLE scheme_beneficiaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheme_id UUID REFERENCES schemes(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
  application_date TIMESTAMPTZ DEFAULT now(),
  approval_status TEXT DEFAULT 'pending',
  approved_date TIMESTAMPTZ,
  amount_disbursed DECIMAL(12,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (student_id IS NOT NULL OR institution_id IS NOT NULL)
);

-- Create activities/events table
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  activity_type TEXT,
  status TEXT DEFAULT 'completed',
  activity_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_institutions_user_id ON institutions(user_id);
CREATE INDEX idx_institutions_aishe_code ON institutions(aishe_code);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_aadhar_id ON students(aadhar_id);
CREATE INDEX idx_teachers_user_id ON teachers(user_id);
CREATE INDEX idx_teachers_apar_id ON teachers(apar_id);
CREATE INDEX idx_nirf_rankings_institution_year ON nirf_rankings(institution_id, year);
CREATE INDEX idx_scheme_beneficiaries_student ON scheme_beneficiaries(student_id);
CREATE INDEX idx_scheme_beneficiaries_institution ON scheme_beneficiaries(institution_id);
CREATE INDEX idx_activities_institution ON activities(institution_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_institutions_updated_at
  BEFORE UPDATE ON institutions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at
  BEFORE UPDATE ON teachers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schemes_updated_at
  BEFORE UPDATE ON schemes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.full_name, '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_user_created
  AFTER INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert some sample data
INSERT INTO schemes (name, description, ministry, benefits, is_active) VALUES
('PM-USHA', 'Promoting University Social Responsibility and Action', 'Ministry of Education', 'Funding for community development projects', true),
('RUSA', 'Rashtriya Uchchatar Shiksha Abhiyan', 'Ministry of Education', 'Infrastructure development funding', true),
('National Scholarship', 'Merit-based scholarship program', 'Ministry of Education', 'Financial assistance for meritorious students', true);

-- Grant permissions to the user
GRANT ALL ON ALL TABLES IN SCHEMA public TO eduunify_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO eduunify_user;
