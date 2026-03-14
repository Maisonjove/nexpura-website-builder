import { NextResponse } from 'next/server'

// In production this would query Supabase:
// const { data } = await supabase
//   .from('product_passports')
//   .select('*')
//   .eq('product_id', productId)
//   .eq('tenant_key', tenantKey)
//   .single()

// Mock passport data for demo
const PASSPORTS: Record<string, {
  productId: string
  productName: string
  metal: string
  caratage?: string
  gemstones?: string
  weight?: string
  craftedBy?: string
  craftedDate?: string
  certificateNumber?: string
  passportId: string
  issuedDate: string
  verifiedBy: string
}> = {
  'prod_sdr_001': {
    productId: 'prod_sdr_001',
    productName: 'Solitaire Diamond Ring',
    metal: '18ct White Gold',
    caratage: '18ct',
    gemstones: 'Round Brilliant Diamond, 0.72ct, G/VS1',
    weight: '3.8g',
    craftedBy: 'Maison Bijou Atelier, London',
    craftedDate: '2024-01-15',
    certificateNumber: 'GIA-2406768282',
    passportId: 'pp_001',
    issuedDate: '2024-01-16',
    verifiedBy: 'Nexpura',
  },
  'prod_gpb_001': {
    productId: 'prod_gpb_001',
    productName: 'Gold Pearl Bracelet',
    metal: '14ct Yellow Gold',
    caratage: '14ct',
    gemstones: 'South Sea Pearl, 8–10mm',
    weight: '12.4g',
    craftedBy: 'Maison Bijou Atelier, London',
    craftedDate: '2024-02-05',
    passportId: 'pp_002',
    issuedDate: '2024-02-06',
    verifiedBy: 'Nexpura',
  },
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params
    const { searchParams } = new URL(req.url)
    const tenantKey = searchParams.get('key')

    if (!tenantKey) {
      return NextResponse.json({ error: 'Missing tenant key' }, { status: 400 })
    }

    // Validate tenant key format (basic check — real validation against Supabase)
    if (!tenantKey.startsWith('nxp_')) {
      return NextResponse.json({ error: 'Invalid tenant key' }, { status: 401 })
    }

    const passport = PASSPORTS[productId]

    if (!passport) {
      return NextResponse.json({ error: 'Passport not found' }, { status: 404 })
    }

    // Track scan (in production: insert to passport_scans table)
    // await supabase.from('passport_scans').insert({
    //   passport_id: passport.passportId,
    //   scanned_at: new Date().toISOString(),
    //   user_agent: req.headers.get('user-agent'),
    // })

    return NextResponse.json({
      ...passport,
      passportUrl: `https://passport.nexpura.app/${passport.passportId}`,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
