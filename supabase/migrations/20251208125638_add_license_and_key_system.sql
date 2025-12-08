/*
  # Add License and Key System

  1. New Tables
    - `licenses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `status` (text: active/inactive)
      - `created_at` (timestamptz)
    - `access_keys`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `created_by` (uuid, references profiles)
      - `redeemed_by` (uuid, references profiles, nullable)
      - `is_used` (boolean)
      - `created_at` (timestamptz)
      - `redeemed_at` (timestamptz, nullable)
    - `user_bans`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `banned_by` (uuid, references profiles)
      - `reason` (text)
      - `banned_at` (timestamptz)
      - `is_active` (boolean)
    - `admin_users`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles, unique)
      - `is_owner` (boolean)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all new tables
    - Add appropriate policies
*/

-- Create licenses table
CREATE TABLE IF NOT EXISTS licenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status text DEFAULT 'inactive' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create access_keys table
CREATE TABLE IF NOT EXISTS access_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  redeemed_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  is_used boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  redeemed_at timestamptz
);

-- Create user_bans table
CREATE TABLE IF NOT EXISTS user_bans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  banned_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason text NOT NULL,
  banned_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  UNIQUE(user_id)
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  is_owner boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_bans ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Licenses Policies
CREATE POLICY "Users can view own license"
  ON licenses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view all licenses if admin"
  ON licenses
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Access Keys Policies
CREATE POLICY "Users can view their own redeemed keys"
  ON access_keys
  FOR SELECT
  TO authenticated
  USING (redeemed_by = auth.uid());

CREATE POLICY "Admins can view all keys"
  ON access_keys
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert keys"
  ON access_keys
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update keys"
  ON access_keys
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- User Bans Policies
CREATE POLICY "Users can view own ban status"
  ON user_bans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all bans"
  ON user_bans
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage bans"
  ON user_bans
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update bans"
  ON user_bans
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Admin Users Policies
CREATE POLICY "Admins can view admin list"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Only owner can manage admins"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.is_owner = true
    )
  );
