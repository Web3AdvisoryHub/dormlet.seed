-- Create egg_claims table
CREATE TABLE IF NOT EXISTS egg_claims (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  egg_uri TEXT NOT NULL,
  creature_name TEXT NOT NULL,
  creature_story TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS egg_claims_user_id_idx ON egg_claims(user_id);

-- Add RLS policies
ALTER TABLE egg_claims ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own claims
CREATE POLICY "Users can view their own claims"
  ON egg_claims
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Allow users to insert their own claims
CREATE POLICY "Users can insert their own claims"
  ON egg_claims
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Allow users to update their own claims
CREATE POLICY "Users can update their own claims"
  ON egg_claims
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_egg_claims_updated_at
  BEFORE UPDATE ON egg_claims
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 