'use client'

import { useState } from 'react'

interface Props {
  props: Record<string, unknown>
  content: Record<string, unknown>
}

const REPAIR_TYPES = ['Ring Resize', 'Chain Repair', 'Stone Reset', 'Clasp Repair', 'Polishing & Cleaning', 'Engraving', 'Other']

export default function RepairForm({ content }: Props) {
  const heading = (content.heading as string) || 'Book a Repair'
  const subheading = (content.subheading as string) || 'Expert jewellery repairs'

  const [form, setForm] = useState({ name: '', email: '', phone: '', repairType: '', description: '', preferredDate: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function update(key: keyof typeof form, val: string) {
    setForm((p) => ({ ...p, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/public/repair-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-nexpura-mint mb-3">Repair Service</p>
          <h2 className="font-playfair text-4xl text-gray-900 mb-3">{heading}</h2>
          <p className="text-gray-500">{subheading}</p>
        </div>

        {status === 'sent' ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔧</div>
            <h3 className="font-playfair text-2xl text-gray-800 mb-2">Repair Request Received</h3>
            <p className="text-gray-500">We'll confirm your booking within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                <input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Repair Type *</label>
                <select required value={form.repairType} onChange={(e) => update('repairType', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint">
                  <option value="">Select type...</option>
                  {REPAIR_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Describe the Issue *</label>
              <textarea required rows={4} value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Please describe what needs repairing..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Drop-off Date</label>
              <input type="date" value={form.preferredDate} onChange={(e) => update('preferredDate', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint" />
            </div>
            {status === 'error' && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
            <button type="submit" disabled={status === 'sending'} className="w-full py-4 bg-nexpura-forest text-white text-sm tracking-widest uppercase font-medium hover:bg-nexpura-forest/90 transition-colors disabled:opacity-50 rounded-lg">
              {status === 'sending' ? 'Submitting...' : 'Book Repair'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
