CREATE TABLE IF NOT EXISTS contact_leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  inquiry TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL,
  landing_page TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'archived'))
);

CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at
  ON contact_leads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_leads_status
  ON contact_leads(status, created_at DESC);

CREATE TABLE IF NOT EXISTS contact_rate_limits (
  ip_hash TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  request_count INTEGER NOT NULL
);
