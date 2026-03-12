'use client'

import { useState } from 'react'

interface ThemeSettings {
  primaryColor: string
  accentColor: string
  headingFont: string
  bodyFont: string
  borderRadius: string
}

const FONTS = ['Playfair Display', 'Cormorant Garamond', 'Inter', 'Lato', 'Montserrat', 'Raleway']
const BORDER_RADIUS_OPTIONS = [
  { value: 'sharp', label: 'Sharp', class: 'rounded-none' },
  { value: 'soft', label: 'Soft', class: 'rounded-md' },
  { value: 'round', label: 'Round', class: 'rounded-full' },
]

export default function ThemePage() {
  const [theme, setTheme] = useState<ThemeSettings>({
    primaryColor: '#1a2e1a',
    accentColor: '#52B788',
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    borderRadius: 'soft',
  })
  const [saved, setSaved] = useState(false)

  function update(key: keyof ThemeSettings, value: string) {
    setTheme((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    // TODO: save to Supabase
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-playfair font-semibold text-gray-900">Theme</h1>
          <p className="text-sm text-gray-500 mt-1">Customise your storefront colours and typography</p>
        </div>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            saved ? 'bg-green-100 text-green-700' : 'bg-nexpura-forest text-white hover:bg-nexpura-forest/90'
          }`}
        >
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Colours */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Colours</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Primary Colour</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => update('primaryColor', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => update('primaryColor', e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Accent Colour</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => update('accentColor', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.accentColor}
                  onChange={(e) => update('accentColor', e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="mt-4 p-4 rounded-lg border border-gray-100" style={{ backgroundColor: theme.primaryColor }}>
            <p className="text-white/70 text-xs mb-2">Preview</p>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ backgroundColor: theme.accentColor }}
            >
              Sample Button
            </button>
          </div>
        </section>

        {/* Typography */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Typography</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Heading Font</label>
              <select
                value={theme.headingFont}
                onChange={(e) => update('headingFont', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
              >
                {FONTS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <p className="mt-2 text-2xl" style={{ fontFamily: `'${theme.headingFont}', serif` }}>
                The quick brown fox
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Body Font</label>
              <select
                value={theme.bodyFont}
                onChange={(e) => update('bodyFont', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
              >
                {FONTS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500" style={{ fontFamily: `'${theme.bodyFont}', sans-serif` }}>
                Handcrafted fine jewellery for every occasion
              </p>
            </div>
          </div>
        </section>

        {/* Border radius */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Button Style</h2>
          <div className="flex gap-4">
            {BORDER_RADIUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => update('borderRadius', opt.value)}
                className={`flex-1 py-3 border-2 text-sm font-medium transition-colors ${
                  theme.borderRadius === opt.value
                    ? 'border-nexpura-mint text-nexpura-forest bg-nexpura-mint/5'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
                style={{ borderRadius: opt.value === 'sharp' ? 0 : opt.value === 'round' ? 999 : 8 }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
