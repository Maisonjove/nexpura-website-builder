'use client'

import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

interface Props {
  tenantKey: string
  greeting?: string
}

export default function ChatWidget({ tenantKey, greeting = "Hi! I'm your jewellery assistant. Ask me anything about our pieces, repairs, or bespoke services." }: Props) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: greeting }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSend() {
    if (!input.trim() || loading) return
    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }])
    setLoading(true)

    // Simulate AI response (TODO: call actual AI API)
    await new Promise((r) => setTimeout(r, 1200))
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        text: "Thank you for your question! One of our team members will be in touch shortly to help you with that. You can also call us or visit our studio.",
      },
    ])
    setLoading(false)
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-nexpura-forest text-white rounded-full shadow-xl flex items-center justify-center text-xl hover:bg-nexpura-forest/90 transition-colors z-[9990]"
        title="Chat with us"
      >
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl flex flex-col z-[9991] overflow-hidden border border-gray-100" style={{ maxHeight: '70vh' }}>
          {/* Header */}
          <div className="bg-nexpura-forest px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-nexpura-mint rounded-full" />
              <span className="text-sm font-medium">Jewellery Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white text-sm">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-nexpura-forest text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-xl rounded-bl-none">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="w-9 h-9 flex items-center justify-center bg-nexpura-forest text-white rounded-lg disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
