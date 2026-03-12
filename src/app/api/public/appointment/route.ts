import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = AppointmentSchema.parse(body)

    // TODO: persist to Supabase, integrate with calendar
    console.log('[appointment] Received:', data)

    return NextResponse.json({
      success: true,
      message: `Appointment confirmed for ${data.date} at ${data.time}. See you soon!`,
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: err.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 })
  }
}
