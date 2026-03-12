'use client'

import { useState } from 'react'

type Platform = 'shopify' | 'wordpress' | 'squarespace' | 'other'
type WidgetKey = 'chat' | 'passport' | 'booking' | 'bespoke' | 'repair'

const WIDGETS: { key: WidgetKey; label: string; icon: string; description: string }[] = [
  { key: 'chat', label: 'AI Chat', icon: '💬', description: 'Intelligent jewellery assistant for your site' },
  { key: 'passport', label: 'Digital Passport', icon: '🔒', description: 'Show product authenticity & provenance' },
  { key: 'booking', label: 'Appointment Booking', icon: '📅', description: 'In-store consultation booking' },
  { key: 'bespoke', label: 'Bespoke Enquiry', icon: '💎', description: 'Custom commission request form' },
  { key: 'repair', label: 'Repair Booking', icon: '🔧', description: 'Jewellery repair intake form' },
]

const TENANT_KEY = 'nxp_demo_key_xxxxxxxxxxxx'

const PLATFORM_INSTRUCTIONS: Record<Platform, { label: string; steps: string[] }> = {
  shopify: {
    label: 'Shopify',
    steps: [
      'From your Shopify admin, go to Online Store → Themes',
      'Click "Actions" → "Edit code" on your active theme',
      'Open the theme.liquid file',
      'Paste the embed snippet just before the closing </body> tag',
      'Save the file and preview your store',
    ],
  },
  wordpress: {
    label: 'WordPress',
    steps: [
      'In your WordPress dashboard, go to Appearance → Theme Editor (or use a plugin like "Insert Headers and Footers")',
      'If using Theme Editor: open footer.php and paste the snippet before </body>',
      'If using a plugin: paste in the "Footer Scripts" section',
      'Save and visit your site to see the widgets appear',
    ],
  },
  squarespace: {
    label: 'Squarespace',
    steps: [
      'Go to your Squarespace dashboard → Settings',
      'Click "Advanced" → "Code Injection"',
      'Paste the embed snippet in the "Footer" code box',
      'Save and preview your site',
    ],
  },
  other: {
    label: 'Other',
    steps: [
      'Open your website\'s HTML template or theme file',
      'Locate the closing </body> tag (usually in a footer.html, layout.html, or base.html file)',
      'Paste the embed snippet just before </body>',
      'Save the file and deploy / refresh your site',
    ],
  },
}

export default function ConnectPage() {
  const [enabledWidgets, setEnabledWidgets] = useState<Set<WidgetKey>>(
    new Set<WidgetKey>(['chat', 'passport'])
  )
  const [activePlatform, setActivePlatform] = useState<Platform>('shopify')
  const [copied, setCopied] = useState(false)

  function toggleWidget(key: WidgetKey) {
    const next = new Set(enabledWidgets)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    setEnabledWidgets(next)
  }

  const widgetParam = Array.from(enabledWidgets).join(',')
  const embedSnippet = `<script src="https://cdn.nexpura.app/embed.js?key=${TENANT_KEY}&widgets=${widgetParam}" defer></script>`

  function handleCopy() {
    navigator.clipboard.writeText(embedSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const instructions = PLATFORM_INSTRUCTIONS[activePlatform]

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-playfair font-semibold text-gray-900">Website Connect</h1>
        <p className="text-sm text-gray-500 mt-1">
          Add Nexpura widgets to your existing website with a single snippet
        </p>
      </div>

      {/* Widget toggles */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Enable Widgets</h2>
        <div className="space-y-3">
          {WIDGETS.map((widget) => {
            const enabled = enabledWidgets.has(widget.key)
            return (
              <div key={widget.key} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{widget.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{widget.label}</p>
                    <p className="text-xs text-gray-400">{widget.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleWidget(widget.key)}
                  className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                    enabled ? 'bg-nexpura-mint' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-sm mx-0.5 transition-transform ${
                      enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Embed snippet */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Your Embed Snippet</h2>
        <p className="text-xs text-gray-400 mb-3">
          Copy this snippet and paste it into your website's HTML, just before the closing{' '}
          <code className="bg-gray-100 px-1 rounded">{'</body>'}</code> tag.
        </p>
        <div className="relative">
          <pre className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs font-mono text-gray-700 overflow-x-auto whitespace-pre-wrap break-all">
            {embedSnippet}
          </pre>
          <button
            onClick={handleCopy}
            className={`absolute top-2 right-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      </section>

      {/* Platform instructions */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Installation Instructions</h2>

        {/* Platform tabs */}
        <div className="flex gap-1 mb-5 bg-gray-100 p-1 rounded-lg">
          {(['shopify', 'wordpress', 'squarespace', 'other'] as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => setActivePlatform(p)}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                activePlatform === p
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {PLATFORM_INSTRUCTIONS[p].label}
            </button>
          ))}
        </div>

        {/* Steps */}
        <ol className="space-y-3">
          {instructions.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-nexpura-forest text-white text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm text-gray-600">{step}</p>
            </li>
          ))}
        </ol>

        <div className="mt-5 p-3 bg-nexpura-mint/10 rounded-lg border border-nexpura-mint/20">
          <p className="text-xs text-nexpura-forest font-medium">💡 Need help?</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Contact Nexpura support at{' '}
            <a href="mailto:support@nexpura.app" className="text-nexpura-mint hover:underline">
              support@nexpura.app
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
