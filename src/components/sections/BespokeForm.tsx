'use client'

import { useState } from 'react'

interface Props {
  props: Record<string, unknown>
  content: Record<string, unknown>
}

const BUDGET_RANGES = ['Under £500', '£500–£1,000', '£1,000–£2,500', '£2,500–£5,000', '£5,000–£10,000', '£10,000+']
const METALS = ['18ct Yellow Gold', '18ct White Gold', '18ct Rose Gold', 'Platinum', 'Sterling Silver', 'Not Sure']
const TIMELINES = ['ASAP', 'Within 1 month', '1–3 months', '3–6 months', 'No rush']

export default function BespokeForm({ content }: Props) {
  const heading = (content.heading as string) || 'Create Your Dream Piece'
  const subheading = (content.subheading as string) || 'Tell us about your vision'

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    budget: '',
    metal: '',
    timeline: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/public/bespoke-enquiry', {
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
    <section className="py-20 px-6 bg-nexpura-cream">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-nexpura-mint mb-3">Bespoke Service</p>
          <h2 className="font-playfair text-4xl text-gray-900 mb-3">{heading}</h2>
          <p className="text-gray-500">{subheading}</p>
        </div>

        {status === 'sent' ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <div className="text-5xl mb-4">💎</div>
            <h3 className="font-playfair text-2xl text-gray-800 mb-2">Enquiry Received</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              Thank you for your interest in our bespoke service. We'll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-8 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Describe Your Vision *
              </label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Tell us about the piece you'd like to create — occasion, style, inspiration..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint resize-none"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget Range *</label>
                <select
                  required
                  value={form.budget}
                  onChange={(e) => update('budget', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                >
                  <option value="">Select...</option>
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Metal</label>
                <select
                  value={form.metal}
                  onChange={(e) => update('metal', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                >
                  <option value="">Select...</option>
                  {METALS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Timeline</label>
                <select
                  value={form.timeline}
                  onChange={(e) => update('timeline', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                >
                  <option value="">Select...</option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-nexpura-forest text-white text-sm tracking-widest uppercase font-medium hover:bg-nexpura-forest/90 transition-colors disabled:opacity-50 rounded-lg"
            >
              {status === 'sending' ? 'Submitting...' : 'Submit Bespoke Enquiry'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
