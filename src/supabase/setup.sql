
-- Create a table to store document metadata
CREATE TABLE IF NOT EXISTS pdf_documents (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  processing_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE pdf_documents ENABLE ROW LEVEL SECURITY;

-- Create policy to restrict access to document owners only
CREATE POLICY "Users can only access their own documents"
  ON pdf_documents
  FOR ALL
  USING (auth.uid() = user_id);

-- Create chat history table to store conversations
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pdf_id UUID NOT NULL REFERENCES pdf_documents(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_user_message BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to restrict access to message owners only
CREATE POLICY "Users can only access their own chat messages"
  ON chat_messages
  FOR ALL
  USING (auth.uid() = user_id);

-- Create a function to generate a unique collection name for each user
CREATE OR REPLACE FUNCTION get_user_collection_name(user_id UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN 'user_' || replace(user_id::text, '-', '_');
END;
$$ LANGUAGE plpgsql;

-- Create vector extension if not exists
CREATE EXTENSION IF NOT EXISTS vector;

-- Note: Vector collections will be created dynamically by the edge function
-- for each user with the appropriate embedding dimensions (768)
