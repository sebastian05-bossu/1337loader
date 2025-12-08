/*
  # Add Owner Account

  This migration sets up the owner account with email tuvenisebastian@gmail.com
  The account will be created through signup, but this ensures admin access.
  
  NOTE: The owner account must be created first through the signup process
  before this query can reference it.
*/

-- This is a placeholder for setting up admin privileges
-- The actual owner account will be created when they sign up
-- Then you can run this query to make them admin:
-- UPDATE admin_users SET is_owner = true WHERE user_id = (SELECT id FROM profiles WHERE email = 'tuvenisebastian@gmail.com');
