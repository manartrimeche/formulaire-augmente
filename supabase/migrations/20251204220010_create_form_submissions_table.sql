/*
  # Create Form Submissions Table for Nuit de l'Info 2025 Portal

  1. New Tables
    - `form_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `mission_type` (text) - Type of mission: 'contact', 'donation', 'volunteer', 'information'
      - `first_name` (text) - User's first name
      - `last_name` (text) - User's last name
      - `email` (text) - User's email address
      - `message` (text, optional) - Message for contact/information missions
      - `donation_amount` (numeric, optional) - Donation amount for donation mission
      - `donation_frequency` (text, optional) - Frequency: 'once', 'monthly', 'yearly'
      - `skills` (text, optional) - Skills/availability for volunteer mission
      - `preferences` (text, optional) - Mission preferences for volunteer
      - `created_at` (timestamptz) - Timestamp of submission
      
  2. Security
    - Enable RLS on `form_submissions` table
    - Add policy for public insert (anonymous users can submit forms)
    - Add policy for authenticated users to view their own submissions
*/

CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_type text NOT NULL CHECK (mission_type IN ('contact', 'donation', 'volunteer', 'information')),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  message text,
  donation_amount numeric,
  donation_frequency text CHECK (donation_frequency IN ('once', 'monthly', 'yearly') OR donation_frequency IS NULL),
  skills text,
  preferences text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit forms"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can view their own submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));
