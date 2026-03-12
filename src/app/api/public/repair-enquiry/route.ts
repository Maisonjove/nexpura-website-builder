import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const RepairEnquirySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  repairType: z.string(),
  description: z.string().min(5),
  preferredDate: z.string().optional(),
  tenantKey: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = RepairEnquirySchema.parse(body)

    // TODO: persist to Supabase
    console.log('[repair-enquiry] Received:', data)

    return NextResponse.json({ success: true, message: 'Repair request received. We\'ll confirm your booking shortly!' })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: err.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to submit repair request' }, { status: 500 })
  }
}
