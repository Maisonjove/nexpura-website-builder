import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'

const BespokeEnquirySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  description: z.string().min(10),
  budget: z.string(),
  metal: z.string(),
  gemstone: z.string().optional(),
  inspiration: z.string().optional(),
  timeline: z.string().optional(),
  tenantKey: z.string().optional(),
})

function generateRef(prefix: string) {
  const date = new Date()
  const yy = date.getFullYear().toString().slice(-2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-${yy}${mm}-${rand}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = BespokeEnquirySchema.parse(body)

    const refNumber = generateRef('BSP')

    // Persist to Supabase
    try {
      const supabase = createServiceClient()
      await supabase.from('bespoke_enquiries').insert({
        ref_number: refNumber,
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone || null,
        description: data.description,
        budget: data.budget,
        metal: data.metal,
        gemstone: data.gemstone || null,
        inspiration: data.inspiration || null,
        timeline: data.timeline || null,
        tenant_key: data.tenantKey || null,
        status: 'new',
        created_at: new Date().toISOString(),
      })
    } catch (dbErr) {
      console.error('[bespoke-enquiry] DB error (non-fatal):', dbErr)
    }

    return NextResponse.json({
      success: true,
      refNumber,
      message: `Thank you for your bespoke enquiry! Reference: ${refNumber}. Our team will be in touch within 2 business days.`,
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: err.errors }, { status: 400 })
    }
    console.error('[bespoke-enquiry] Error:', err)
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 })
  }
}
