# Nexpura Website Builder

A Next.js 14 application that powers storefront websites for jewellery businesses on the Nexpura platform.

## Modes

### Mode A — Website Builder
Full drag-and-drop section editor at `/builder`. Jewellers can:
- Create and manage pages
- Add/edit/reorder sections (hero, collections, forms, galleries, etc.)
- Customise theme (colours, fonts, border radius)
- Configure domain, SEO, and publishing settings

### Mode B — AI Migration
Wizard at `/builder/migrate` that:
1. Takes a URL of an existing website
2. Crawls and extracts content (title, headings, nav, body text, OG image, brand colour)
3. Previews extracted content
4. Automatically generates a starter page layout

### Mode C — Website Connect
Embed system at `/builder/connect` for jewellers who want to keep their existing website but add Nexpura widgets:
- AI Chat
- Digital Passport
- Appointment Booking
- Bespoke Enquiry
- Repair Booking

Platform-specific installation guides for Shopify, WordPress, Squarespace, and others.

## Public Storefront

Live storefronts rendered at `/site/[domain]` — server-rendered for SEO.

## Getting Started

```bash
cp .env.local.example .env.local
# Fill in your Supabase and Anthropic credentials

npm install
npm run dev
```

## Database

See `supabase/schema.sql` for the full schema. Apply to the main Nexpura Supabase project.

Tables:
- `tenant_website_pages` — pages per tenant
- `tenant_website_sections` — sections per page (with JSONB props/content)
- `tenant_website_settings` — theme, domain, SEO settings
- `bespoke_enquiries`, `repair_enquiries`, `appointments` — inbound form submissions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL + RLS)
- **Language**: TypeScript
- **Web scraping**: cheerio (for Mode B migration)
- **Validation**: zod
