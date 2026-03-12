import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { type: string } }
) {
  const { type } = params
  const tenantKey = req.nextUrl.searchParams.get('key')

  if (!tenantKey) {
    return NextResponse.json({ error: 'Missing tenant key' }, { status: 401 })
  }

  // TODO: validate tenantKey against Supabase and fetch real data

  switch (type) {
    case 'chat':
      return NextResponse.json({
        type: 'chat',
        config: {
          greeting: 'Hello! How can I help you today?',
          model: 'nexpura-jewellery-v1',
          tenantKey,
        },
      })

    case 'passport':
      return NextResponse.json({
        type: 'passport',
        config: {
          showCertification: true,
          showProvenance: true,
          tenantKey,
        },
      })

    case 'booking':
      return NextResponse.json({
        type: 'booking',
        config: {
          services: ['Consultation', 'Repair Drop-off', 'Custom Order'],
          availableSlots: [], // Would be fetched from calendar integration
          tenantKey,
        },
      })

    case 'bespoke':
      return NextResponse.json({
        type: 'bespoke',
        config: {
          budgetRanges: ['£500–£1,000', '£1,000–£2,500', '£2,500–£5,000', '£5,000+'],
          metals: ['18ct Yellow Gold', '18ct White Gold', '18ct Rose Gold', 'Platinum', 'Silver'],
          tenantKey,
        },
      })

    case 'repair':
      return NextResponse.json({
        type: 'repair',
        config: {
          repairTypes: ['Ring Resize', 'Chain Repair', 'Stone Reset', 'Polishing', 'Clasp Repair', 'Other'],
          tenantKey,
        },
      })

    default:
      return NextResponse.json({ error: `Unknown widget type: ${type}` }, { status: 404 })
  }
}
