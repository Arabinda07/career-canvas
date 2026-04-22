import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a dummy client if keys are not provided yet, handle gracefully.
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock database schema for local dev or when keys aren't set
export const SUPABASE_SCHEMA = `
-- Run this in your Supabase SQL Editor

-- 1. Create Schools/Counselors table
CREATE TABLE IF NOT EXISTS classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  counselor_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Exams table
CREATE TABLE IF NOT EXISTS exams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  time_limit_minutes INTEGER DEFAULT 60,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Questions table
CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_id UUID REFERENCES exams(id),
  category TEXT, -- 'RIASEC' or 'BigFive'
  sub_topic TEXT, -- e.g., 'Realistic', 'Extraversion'
  text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of { label, score }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Exam Responses table
CREATE TABLE IF NOT EXISTS responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id),
  exam_id UUID REFERENCES exams(id),
  class_code TEXT REFERENCES classes(code),
  answers JSONB, -- Map of question_id to chosen_score
  scores JSONB, -- Computed scores per category/sub_topic
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Report Templates table
CREATE TABLE IF NOT EXISTS report_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  sub_topic TEXT NOT NULL,
  min_score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  text_snippet TEXT NOT NULL
);
`;
