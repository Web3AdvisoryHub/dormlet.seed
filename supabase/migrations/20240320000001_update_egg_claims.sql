-- Add new fields to egg_claims table
ALTER TABLE egg_claims
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS can_regift BOOLEAN DEFAULT false;

-- Update RLS policies to respect privacy settings
CREATE POLICY "Users can view public claims"
  ON egg_claims
  FOR SELECT
  USING (is_public = true OR auth.uid()::text = user_id);

-- Add comment for future implementation
COMMENT ON COLUMN egg_claims.can_regift IS 'Future feature: Enable regifting of eggs to other users'; 