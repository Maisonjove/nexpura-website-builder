'use client'

import { useState } from 'react'

interface Props {
  props: Record<string, unknown>
  content: Record<string, unknown>
}

const TIME_SLOTS = ['10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

export default function AppointmentForm({ props, content }: Props) {
  const heading = (content.heading as string) || 'Book an Appointment'
  const services = (props.services as string[]) || ['Consultation', 'Repair Drop-off', 'Custom Order']

  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', time: '', notes: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function update(key: keyof typeof form, val: string) {
    setForm((p) => ({ ...p, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/public/appointment', {
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
    <section className="py-20 px-6 bg-stone-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-nexpura-mint mb-3">Visit Us</p>
          <h2 className="font-playfair text-4xl text-gray-900 mb-3">{heading}</h2>
        </div>

        {status === 'sent' ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="font-playfair text-2xl text-gray-800 mb-2">Appointment Confirmed</h3>
            <p className="text-gray-500">We look forward to seeing you. A confirmation has been sent to your email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-8 space-y-5">
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Service *</label>
                <select required value={form.service} onChange={(e) => update('service', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint">
                  <option value="">Select...</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date *</label>
                <input type="date" required value={form.date} onChange={(e) => update('date', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Time *</label>
                <select required value={form.time} onChange={(e) => update('time', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint">
                  <option value="">Select...</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
              <textarea rows={3} value={form.notes} onChange={(e) => update('notes', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint resize-none" />
            </div>
            {status === 'error' && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
            <button type="submit" disabled={status === 'sending'} className="w-full py-4 bg-nexpura-forest text-white text-sm tracking-widest uppercase font-medium hover:bg-nexpura-forest/90 transition-colors disabled:opacity-50 rounded-lg">
              {status === 'sending' ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
