-- Create user_links table
CREATE TABLE IF NOT EXISTS user_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS user_links_user_id_idx ON user_links(user_id);

-- Enable RLS
ALTER TABLE user_links ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own links"
  ON user_links FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view public links"
  ON user_links FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can insert their own links"
  ON user_links FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own links"
  ON user_links FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own links"
  ON user_links FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_user_links_updated_at
  BEFORE UPDATE ON user_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 