'use client'

import { useState } from 'react'

interface Props {
  tenantKey: string
  services?: string[]
}

export default function BookingWidget({ tenantKey, services = ['Consultation', 'Repair Drop-off', 'Custom Order'] }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', service: '', date: '', time: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  function update(key: keyof typeof form, val: string) {
    setForm((p) => ({ ...p, [key]: val }))
  }

  async function handleBook() {
    setStatus('sending')
    try {
      await fetch('/api/public/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tenantKey }),
      })
      setStatus('sent')
    } catch {
      setStatus('idle')
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-nexpura-mint text-white text-sm rounded-lg hover:bg-nexpura-mint/90 transition-colors font-medium"
      >
        📅 Book Appointment
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-playfair text-lg font-semibold text-gray-900">Book an Appointment</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {status === 'sent' ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-playfair text-lg text-gray-800 mb-1">Confirmed!</h3>
                <p className="text-sm text-gray-500">We'll see you soon. Check your email for details.</p>
                <button onClick={() => { setOpen(false); setStatus('idle') }} className="mt-4 text-sm text-nexpura-mint">Close</button>
              </div>
            ) : (
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Name</label>
                  <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint" />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint" />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Service</label>
                  <select value={form.service} onChange={(e) => update('service', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint">
                    <option value="">Select...</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Date</label>
                    <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Time</label>
                    <input type="time" value={form.time} onChange={(e) => update('time', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint" />
                  </div>
                </div>
                <button
                  onClick={handleBook}
                  disabled={status === 'sending' || !form.name || !form.email || !form.service || !form.date}
                  className="w-full py-3 bg-nexpura-forest text-white rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-nexpura-forest/90"
                >
                  {status === 'sending' ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
