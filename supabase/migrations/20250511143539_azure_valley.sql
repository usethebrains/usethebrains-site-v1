/*
  # Initial Schema Setup for Subscription Platform

  1. New Tables
    - `users`
      - Custom user profile fields
      - Learning preferences
      - Subscription status
    - `subscriptions`
      - Subscription plan details
      - Payment history
      - Status tracking
    - `courses`
      - Course content and metadata
      - Access level requirements
    - `course_progress`
      - User progress tracking
      - Completion status
      - Last accessed
    - `course_reviews`
      - User reviews and ratings
    - `certificates`
      - Completion certificates
    - `bookmarks`
      - User course bookmarks

  2. Security
    - Enable RLS on all tables
    - Set up access policies
*/

-- Users table with extended profile
CREATE TABLE IF NOT EXISTS users (
  id uuid REFERENCES auth.users ON DELETE CASCADE,
  first_name text,
  last_name text,
  email text UNIQUE,
  phone text,
  learning_preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (id)
);

-- Subscription plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  interval text NOT NULL,
  features jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- User subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES subscription_plans(id),
  status text NOT NULL,
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  payment_method_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  thumbnail_url text,
  instructor_id uuid REFERENCES users(id),
  level text NOT NULL,
  duration interval,
  required_subscription_plan uuid REFERENCES subscription_plans(id),
  content jsonb DEFAULT '{}',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Course progress tracking
CREATE TABLE IF NOT EXISTS course_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  progress decimal(5,2) DEFAULT 0,
  last_accessed timestamptz,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Course reviews
CREATE TABLE IF NOT EXISTS course_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  review text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Completion certificates
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  issued_at timestamptz DEFAULT now(),
  certificate_url text,
  UNIQUE(user_id, course_id)
);

-- Course bookmarks
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Anyone can read subscription plans
CREATE POLICY "Public subscription plans access" ON subscription_plans
  FOR SELECT USING (true);

-- Users can read their own subscriptions
CREATE POLICY "Users can read own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Public can read published courses
CREATE POLICY "Public can read published courses" ON courses
  FOR SELECT USING (published = true);

-- Users can read their course progress
CREATE POLICY "Users can read own progress" ON course_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their course progress
CREATE POLICY "Users can update own progress" ON course_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can read and write their own reviews
CREATE POLICY "Users can manage own reviews" ON course_reviews
  FOR ALL USING (auth.uid() = user_id);

-- Users can read their certificates
CREATE POLICY "Users can read own certificates" ON certificates
  FOR SELECT USING (auth.uid() = user_id);

-- Users can manage their bookmarks
CREATE POLICY "Users can manage own bookmarks" ON bookmarks
  FOR ALL USING (auth.uid() = user_id);

-- Insert sample subscription plans
INSERT INTO subscription_plans (name, description, price, interval, features) VALUES
  ('Basic', 'Access to basic courses and features', 9.99, 'month', '{"courses": "basic", "downloads": false, "support": "email"}'),
  ('Premium', 'Full access to all courses and features', 19.99, 'month', '{"courses": "all", "downloads": true, "support": "priority"}'),
  ('Enterprise', 'Custom solutions for organizations', 49.99, 'month', '{"courses": "all", "downloads": true, "support": "dedicated"}');