-- ============================================================
-- Nexpura Website Builder — Database Schema
-- Apply to main Nexpura Supabase project
-- ============================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- tenant_website_pages
-- Each jeweller's storefront can have multiple pages
-- ============================================================
CREATE TABLE public.tenant_website_pages (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id   UUID        NOT NULL,
  slug        TEXT        NOT NULL,
  title       TEXT        NOT NULL,
  page_type   TEXT        NOT NULL DEFAULT 'custom',  -- 'home' | 'contact' | 'custom'
  is_published BOOLEAN    DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, slug)
);

CREATE INDEX idx_tenant_website_pages_tenant ON public.tenant_website_pages(tenant_id);

-- ============================================================
-- tenant_website_sections
-- Ordered sections that make up each page
-- ============================================================
CREATE TABLE public.tenant_website_sections (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id      UUID        NOT NULL REFERENCES public.tenant_website_pages(id) ON DELETE CASCADE,
  tenant_id    UUID        NOT NULL,
  section_type TEXT        NOT NULL,   -- matches SectionType in src/lib/sections.ts
  sort_order   INTEGER     NOT NULL DEFAULT 0,
  props        JSONB       DEFAULT '{}',
  content      JSONB       DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tenant_website_sections_page ON public.tenant_website_sections(page_id);
CREATE INDEX idx_tenant_website_sections_tenant ON public.tenant_website_sections(tenant_id);

-- ============================================================
-- tenant_website_settings
-- One row per tenant: theme, domain, SEO, publish state
-- ============================================================
CREATE TABLE public.tenant_website_settings (
  id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id       UUID        NOT NULL UNIQUE,
  primary_color   TEXT        DEFAULT '#1a2e1a',
  accent_color    TEXT        DEFAULT '#52B788',
  heading_font    TEXT        DEFAULT 'Playfair Display',
  body_font       TEXT        DEFAULT 'Inter',
  border_radius   TEXT        DEFAULT 'soft',   -- 'sharp' | 'soft' | 'round'
  custom_domain   TEXT,
  subdomain       TEXT,
  is_published    BOOLEAN     DEFAULT false,
  meta_title      TEXT,
  meta_description TEXT,
  google_analytics TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- bespoke_enquiries
-- Submitted via BespokeForm or BespokeWidget
-- ============================================================
CREATE TABLE public.bespoke_enquiries (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id   UUID        NOT NULL,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT,
  description TEXT        NOT NULL,
  budget      TEXT,
  metal       TEXT,
  timeline    TEXT,
  status      TEXT        DEFAULT 'new',  -- 'new' | 'contacted' | 'closed'
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- repair_enquiries
-- Submitted via RepairForm
-- ============================================================
CREATE TABLE public.repair_enquiries (
  id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id      UUID        NOT NULL,
  name           TEXT        NOT NULL,
  email          TEXT        NOT NULL,
  phone          TEXT,
  repair_type    TEXT        NOT NULL,
  description    TEXT        NOT NULL,
  preferred_date DATE,
  status         TEXT        DEFAULT 'new',
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- appointments
-- Submitted via AppointmentForm or BookingWidget
-- ============================================================
CREATE TABLE public.appointments (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id   UUID        NOT NULL,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT,
  service     TEXT        NOT NULL,
  date        DATE        NOT NULL,
  time        TEXT        NOT NULL,
  notes       TEXT,
  status      TEXT        DEFAULT 'pending',  -- 'pending' | 'confirmed' | 'cancelled'
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
-- All tables: tenants can only access their own rows.
-- Replace get_tenant_id() with your actual tenant auth function.

ALTER TABLE public.tenant_website_pages    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_website_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bespoke_enquiries       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repair_enquiries        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments            ENABLE ROW LEVEL SECURITY;

-- Example RLS policies (adapt get_tenant_id() to your auth setup):

CREATE POLICY "tenant_own_pages"
  ON public.tenant_website_pages
  USING (tenant_id = get_tenant_id());

CREATE POLICY "tenant_own_sections"
  ON public.tenant_website_sections
  USING (tenant_id = get_tenant_id());

CREATE POLICY "tenant_own_settings"
  ON public.tenant_website_settings
  USING (tenant_id = get_tenant_id());

CREATE POLICY "tenant_own_bespoke_enquiries"
  ON public.bespoke_enquiries
  USING (tenant_id = get_tenant_id());

CREATE POLICY "tenant_own_repair_enquiries"
  ON public.repair_enquiries
  USING (tenant_id = get_tenant_id());

CREATE POLICY "tenant_own_appointments"
  ON public.appointments
  USING (tenant_id = get_tenant_id());

-- ============================================================
-- updated_at trigger helper
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tenant_website_pages_updated_at
  BEFORE UPDATE ON public.tenant_website_pages
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_tenant_website_sections_updated_at
  BEFORE UPDATE ON public.tenant_website_sections
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_tenant_website_settings_updated_at
  BEFORE UPDATE ON public.tenant_website_settings
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
