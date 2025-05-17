
export interface Document {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  status: 'processing' | 'active' | 'error';
  file_path: string;
}

export interface KnowledgeBase {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  documents: Document[];
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  gemini_api_key?: string;
  created_at: string;
}
