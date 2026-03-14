import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5),
  tenantKey: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = ContactSchema.parse(body)

    try {
      const supabase = createServiceClient()
      await supabase.from('contact_submissions').insert({
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone || null,
        subject: data.subject || null,
        message: data.message,
        tenant_key: data.tenantKey || null,
        status: 'unread',
        created_at: new Date().toISOString(),
      })
    } catch (dbErr) {
      console.error('[contact] DB error (non-fatal):', dbErr)
    }

    return NextResponse.json({
      success: true,
      message: `Thank you, ${data.name}. We'll be in touch shortly!`,
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: err.errors }, { status: 400 })
    }
    console.error('[contact] Error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
