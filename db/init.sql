-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Example table for storing social media posts
CREATE TABLE IF NOT EXISTS social_media_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform text NOT NULL,
  author text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);
