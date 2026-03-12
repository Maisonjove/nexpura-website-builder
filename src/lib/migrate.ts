import * as cheerio from 'cheerio'

export interface WebsiteAnalysis {
  title: string
  description: string
  h1: string
  navLinks: { text: string; href: string | undefined }[]
  bodyText: string
  ogImage: string | null
  themeColor: string | null
  headings: string[]
}

export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NexpuraMigrationBot/1.0)' },
    signal: AbortSignal.timeout(15000),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`)
  }

  const html = await response.text()
  const $ = cheerio.load(html)

  return {
    title: $('title').text().trim() || $('h1').first().text().trim(),
    description: $('meta[name="description"]').attr('content') || '',
    h1: $('h1').first().text().trim(),
    navLinks: $('nav a')
      .map((_, el) => ({
        text: $(el).text().trim(),
        href: $(el).attr('href'),
      }))
      .get()
      .filter((l) => l.text && l.text.length > 0),
    bodyText: $('body').text().replace(/\s+/g, ' ').trim().slice(0, 2000),
    ogImage: $('meta[property="og:image"]').attr('content') || null,
    themeColor: $('meta[name="theme-color"]').attr('content') || null,
    headings: $('h2, h3')
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean)
      .slice(0, 10),
  }
}

export function buildSectionsFromAnalysis(analysis: WebsiteAnalysis) {
  const sections: Array<{
    type: string
    sort_order: number
    props: Record<string, unknown>
    content: Record<string, unknown>
  }> = []

  // Always add a hero
  sections.push({
    type: 'hero',
    sort_order: 0,
    props: { layout: 'full', overlay: true },
    content: {
      heading: analysis.h1 || analysis.title || 'Welcome',
      subheading: analysis.description || '',
      imageUrl: analysis.ogImage,
      ctaText: 'Explore',
      ctaLink: '#',
    },
  })

  // Add trust bar
  sections.push({
    type: 'trust_bar',
    sort_order: 1,
    props: { showPassport: true, showWarranty: true },
    content: {},
  })

  // Add text block if we have body text
  if (analysis.bodyText.length > 100) {
    sections.push({
      type: 'text_block',
      sort_order: 2,
      props: { alignment: 'left' },
      content: {
        heading: analysis.headings[0] || '',
        body: analysis.bodyText.slice(0, 500),
      },
    })
  }

  // Add contact form
  sections.push({
    type: 'contact_form',
    sort_order: sections.length,
    props: {},
    content: { heading: 'Get in Touch' },
  })

  return sections
}
