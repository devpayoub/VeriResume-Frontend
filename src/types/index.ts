export interface Resume {
  id: string
  filename: string
  word_count: number
  created_at: string
  parsed_text: string
}

export interface Session {
  id: string
  target_job_title: string
  status: string
  credits_deducted: boolean
  created_at: string
  completed_at: string | null
}

export interface Transaction {
  id: string
  amount: number
  reason: string
  admin_note: string
  created_at: string
}

export interface AuditTrailEntry {
  id: string
  optimized_result_id: string
  original_sentence: string
  optimized_sentence: string
  confidence_score: number | null
  is_honest: boolean
}

export interface OptimizedResult {
  id: string
  session_id: string
  rewritten_text: string
}

export interface Profile {
  id: string
  full_name: string
  credits_remaining: number
  subscription_tier: string
}
