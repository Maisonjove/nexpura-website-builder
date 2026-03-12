import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const BespokeEnquirySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  description: z.string().min(10),
  budget: z.string(),
  metal: z.string(),
  timeline: z.string().optional(),
  tenantKey: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = BespokeEnquirySchema.parse(body)

    // TODO: persist to Supabase and trigger notification email
    // const supabase = createServerClient(...)
    // await supabase.from('bespoke_enquiries').insert({ ...data, tenant_id })

    console.log('[bespoke-enquiry] Received:', data)

    return NextResponse.json({ success: true, message: 'Enquiry received. We\'ll be in touch soon!' })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: err.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 })
  }
}
