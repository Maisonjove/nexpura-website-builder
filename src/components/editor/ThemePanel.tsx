'use client'

import { ThemeSettings, DEFAULT_THEME } from '@/lib/theme'

interface Props {
  theme: ThemeSettings
  onChange: (theme: ThemeSettings) => void
}

const FONTS = ['Playfair Display', 'Cormorant Garamond', 'Inter', 'Lato', 'Montserrat']

export default function ThemePanel({ theme, onChange }: Props) {
  function update<K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) {
    onChange({ ...theme, [key]: value })
  }

  return (
    <aside className="w-72 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-5">Theme</h2>

        <div className="space-y-5">
          {/* Colours */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Colours</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Primary</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={theme.primaryColor} onChange={(e) => update('primaryColor', e.target.value)} className="w-8 h-8 rounded border border-gray-200 cursor-pointer" />
                  <input type="text" value={theme.primaryColor} onChange={(e) => update('primaryColor', e.target.value)} className="flex-1 border border-gray-200 rounded px-2 py-1.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-nexpura-mint" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Accent</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={theme.accentColor} onChange={(e) => update('accentColor', e.target.value)} className="w-8 h-8 rounded border border-gray-200 cursor-pointer" />
                  <input type="text" value={theme.accentColor} onChange={(e) => update('accentColor', e.target.value)} className="flex-1 border border-gray-200 rounded px-2 py-1.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-nexpura-mint" />
                </div>
              </div>
            </div>
          </div>

          {/* Fonts */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Typography</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Heading Font</label>
                <select value={theme.headingFont} onChange={(e) => update('headingFont', e.target.value)} className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-nexpura-mint">
                  {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Body Font</label>
                <select value={theme.bodyFont} onChange={(e) => update('bodyFont', e.target.value)} className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-nexpura-mint">
                  {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Border radius */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Button Style</p>
            <div className="flex gap-2">
              {(['sharp', 'soft', 'round'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => update('borderRadius', r)}
                  className={`flex-1 py-2 text-xs border transition-colors capitalize ${theme.borderRadius === r ? 'border-nexpura-mint text-nexpura-forest bg-nexpura-mint/5' : 'border-gray-200 text-gray-500'}`}
                  style={{ borderRadius: r === 'sharp' ? 0 : r === 'round' ? 999 : 6 }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => onChange(DEFAULT_THEME)}
            className="w-full py-2 text-xs text-gray-400 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </aside>
  )
}
