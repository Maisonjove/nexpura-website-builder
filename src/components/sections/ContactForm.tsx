'use client'

import { useState } from 'react'

interface Props {
  props: Record<string, unknown>
  content: Record<string, unknown>
}

export default function ContactForm({ content }: Props) {
  const heading = (content.heading as string) || 'Get in Touch'
  const subheading = (content.subheading as string) || "We'd love to hear from you"

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      // Simple mailto fallback or custom API
      await new Promise((r) => setTimeout(r, 1000))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 px-6 bg-stone-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-4xl text-gray-900 mb-3">{heading}</h2>
          <p className="text-gray-500">{subheading}</p>
        </div>

        {status === 'sent' ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">✉️</div>
            <h3 className="font-playfair text-2xl text-gray-800 mb-2">Message Sent</h3>
            <p className="text-gray-500">Thank you for reaching out. We'll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint resize-none"
              />
            </div>
            {status === 'error' && (
              <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-nexpura-forest text-white text-sm tracking-widest uppercase font-medium hover:bg-nexpura-forest/90 transition-colors disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
