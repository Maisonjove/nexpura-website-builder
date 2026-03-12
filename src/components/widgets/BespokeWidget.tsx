'use client'

import { useState } from 'react'

interface Props {
  tenantKey: string
}

const BUDGET_RANGES = ['Under £500', '£500–£1,000', '£1,000–£2,500', '£2,500–£5,000', '£5,000+']
const METALS = ['18ct Yellow Gold', '18ct White Gold', 'Platinum', 'Silver', 'Not Sure']

export default function BespokeWidget({ tenantKey }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', description: '', budget: '', metal: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  function update(key: keyof typeof form, val: string) {
    setForm((p) => ({ ...p, [key]: val }))
  }

  async function handleSubmit() {
    setStatus('sending')
    try {
      await fetch('/api/public/bespoke-enquiry', {
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
        className="flex items-center gap-2 px-5 py-3 bg-nexpura-forest text-white text-sm rounded-lg hover:bg-nexpura-forest/90 transition-colors font-medium"
      >
        💎 Commission a Piece
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-playfair text-lg font-semibold text-gray-900">Bespoke Enquiry</h2>
                <p className="text-xs text-gray-400 mt-0.5">Tell us your vision</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {status === 'sent' ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-3">💎</div>
                <h3 className="font-playfair text-lg text-gray-800 mb-1">Enquiry Sent</h3>
                <p className="text-sm text-gray-500">We'll be in touch within 24 hours.</p>
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
                  <label className="block text-xs text-gray-600 mb-1">Describe your vision</label>
                  <textarea rows={3} value={form.description} onChange={(e) => update('description', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Budget</label>
                    <select value={form.budget} onChange={(e) => update('budget', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint">
                      <option value="">Select...</option>
                      {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Metal</label>
                    <select value={form.metal} onChange={(e) => update('metal', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint">
                      <option value="">Select...</option>
                      {METALS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={status === 'sending' || !form.name || !form.email || !form.description}
                  className="w-full py-3 bg-nexpura-forest text-white rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-nexpura-forest/90"
                >
                  {status === 'sending' ? 'Sending...' : 'Submit Enquiry'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
