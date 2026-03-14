import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'

const RepairEnquirySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  repairType: z.string(),
  description: z.string().min(5),
  preferredDate: z.string().optional(),
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
    const data = RepairEnquirySchema.parse(body)

    const refNumber = generateRef('REP')

    // Persist to Supabase
    try {
      const supabase = createServiceClient()
      await supabase.from('repair_enquiries').insert({
        ref_number: refNumber,
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone || null,
        repair_type: data.repairType,
        description: data.description,
        preferred_date: data.preferredDate || null,
        tenant_key: data.tenantKey || null,
        status: 'received',
        created_at: new Date().toISOString(),
      })
    } catch (dbErr) {
      console.error('[repair-enquiry] DB error (non-fatal):', dbErr)
    }

    return NextResponse.json({
      success: true,
      refNumber,
      message: `Repair request received! Your reference is ${refNumber}. We'll confirm your booking within 24 hours.`,
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: err.errors }, { status: 400 })
    }
    console.error('[repair-enquiry] Error:', err)
    return NextResponse.json({ error: 'Failed to submit repair request' }, { status: 500 })
  }
}
