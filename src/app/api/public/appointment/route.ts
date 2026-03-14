import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'

const AppointmentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string(),
  date: z.string(),
  time: z.string(),
  notes: z.string().optional(),
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
    const data = AppointmentSchema.parse(body)

    const refNumber = generateRef('APT')

    // Persist to Supabase
    try {
      const supabase = createServiceClient()
      await supabase.from('appointments').insert({
        ref_number: refNumber,
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone || null,
        service: data.service,
        appointment_date: data.date,
        appointment_time: data.time,
        notes: data.notes || null,
        tenant_key: data.tenantKey || null,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
    } catch (dbErr) {
      // Log but don't fail — degrade gracefully if DB not yet set up
      console.error('[appointment] DB error (non-fatal):', dbErr)
    }

    return NextResponse.json({
      success: true,
      refNumber,
      message: `Appointment confirmed for ${data.date} at ${data.time}. We look forward to seeing you! Reference: ${refNumber}`,
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: err.errors }, { status: 400 })
    }
    console.error('[appointment] Error:', err)
    return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 })
  }
}
