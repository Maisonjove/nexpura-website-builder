import { NextRequest, NextResponse } from 'next/server'
import { analyzeWebsite } from '@/lib/migrate'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url, platform } = body

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate URL
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    // Only allow http/https
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: 'Only HTTP/HTTPS URLs are supported' }, { status: 400 })
    }

    const analysis = await analyzeWebsite(url)

    return NextResponse.json({
      ...analysis,
      platform: platform || 'other',
      analyzedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[migrate/analyze]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to analyze website' },
      { status: 500 }
    )
  }
}
